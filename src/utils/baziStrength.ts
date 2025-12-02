import type { Element } from './flyingStars';
import type { HeavenlyStem, BaZi } from './bazi';

export type BaziStrength = 'strong' | 'weak';

export interface BaziAnalysis {
  strength: BaziStrength;
  favorableElements: Element[];
  unfavorableElements: Element[];
  explanation: string;
}

const MONTH_ELEMENTS: Record<number, Element> = {
  1: 'water',
  2: 'water',
  3: 'wood',
  4: 'wood',
  5: 'wood',
  6: 'fire',
  7: 'fire',
  8: 'fire',
  9: 'metal',
  10: 'metal',
  11: 'metal',
  12: 'water'
};

const ELEMENT_GENERATES: Record<Element, Element> = {
  wood: 'fire',
  fire: 'earth',
  earth: 'metal',
  metal: 'water',
  water: 'wood'
};

const ELEMENT_DRAINS: Record<Element, Element> = {
  fire: 'wood',
  earth: 'fire',
  metal: 'earth',
  water: 'metal',
  wood: 'water'
};

const ELEMENT_CONTROLS: Record<Element, Element> = {
  wood: 'earth',
  earth: 'water',
  water: 'fire',
  fire: 'metal',
  metal: 'wood'
};

const STRENGTH_NAMES: Record<Element, { strong: string; weak: string }> = {
  wood: { strong: '旺木', weak: '弱木' },
  fire: { strong: '旺火', weak: '弱火' },
  earth: { strong: '旺土', weak: '弱土' },
  metal: { strong: '旺金', weak: '弱金' },
  water: { strong: '旺水', weak: '弱水' }
};

export function analyzeBaziStrength(bazi: BaZi, birthMonth: number): BaziAnalysis {
  const dayMasterElement = bazi.dayMasterElement;
  const monthElement = MONTH_ELEMENTS[birthMonth];

  let strength: BaziStrength;
  let favorableElements: Element[];
  let unfavorableElements: Element[];
  let explanation: string;

  if (dayMasterElement === monthElement) {
    strength = 'strong';

    const drainElement = ELEMENT_GENERATES[dayMasterElement];
    const controlElement = ELEMENT_CONTROLS[dayMasterElement];

    favorableElements = [drainElement, controlElement];
    unfavorableElements = [dayMasterElement, ELEMENT_DRAINS[dayMasterElement]];

    const strengthName = STRENGTH_NAMES[dayMasterElement].strong;
    explanation = `你的日主生于当令之月，为${strengthName}。身强者喜泄耗，宜用${getElementName(drainElement)}来引导发挥才华，或用${getElementName(controlElement)}来制衡能量，防止过旺失衡。`;
  } else if (monthElement === ELEMENT_GENERATES[dayMasterElement]) {
    strength = 'strong';

    const drainElement = ELEMENT_GENERATES[dayMasterElement];
    const controlElement = ELEMENT_CONTROLS[dayMasterElement];

    favorableElements = [drainElement, controlElement];
    unfavorableElements = [dayMasterElement, ELEMENT_DRAINS[dayMasterElement]];

    const strengthName = STRENGTH_NAMES[dayMasterElement].strong;
    explanation = `你的日主得月令之生，为${strengthName}。身强者喜泄耗，宜用${getElementName(drainElement)}来发挥潜力，或用${getElementName(controlElement)}来调节平衡。`;
  } else if (monthElement === ELEMENT_CONTROLS[dayMasterElement]) {
    strength = 'weak';

    const supportElement = ELEMENT_DRAINS[dayMasterElement];

    favorableElements = [dayMasterElement, supportElement];
    unfavorableElements = [monthElement, ELEMENT_GENERATES[dayMasterElement]];

    const strengthName = STRENGTH_NAMES[dayMasterElement].weak;
    explanation = `你的日主受月令克制，为${strengthName}。身弱者喜帮扶，需要${getElementName(supportElement)}来生助，或${getElementName(dayMasterElement)}来比肩相帮，增强自身力量。`;
  } else {
    const generatingElement = ELEMENT_DRAINS[dayMasterElement];

    if (monthElement === generatingElement) {
      strength = 'strong';

      const drainElement = ELEMENT_GENERATES[dayMasterElement];
      const controlElement = ELEMENT_CONTROLS[dayMasterElement];

      favorableElements = [drainElement, controlElement];
      unfavorableElements = [dayMasterElement, generatingElement];

      const strengthName = STRENGTH_NAMES[dayMasterElement].strong;
      explanation = `你的日主得月令滋养，为${strengthName}。身强者喜泄耗，需要${getElementName(drainElement)}来展现才华，或${getElementName(controlElement)}来平衡能量。`;
    } else {
      strength = 'weak';

      const supportElement = ELEMENT_DRAINS[dayMasterElement];

      favorableElements = [dayMasterElement, supportElement];
      unfavorableElements = [ELEMENT_GENERATES[dayMasterElement], ELEMENT_CONTROLS[dayMasterElement]];

      const strengthName = STRENGTH_NAMES[dayMasterElement].weak;
      explanation = `你的日主失令，为${strengthName}。身弱者急需生扶，宜用${getElementName(supportElement)}来滋养，或${getElementName(dayMasterElement)}来助力，补足能量根基。`;
    }
  }

  return {
    strength,
    favorableElements,
    unfavorableElements,
    explanation
  };
}

function getElementName(element: Element): string {
  const names: Record<Element, string> = {
    wood: '木',
    fire: '火',
    earth: '土',
    metal: '金',
    water: '水'
  };
  return names[element];
}

export function findMediatingElement(fromElement: Element, toElement: Element): Element | null {
  if (ELEMENT_GENERATES[fromElement] === toElement) {
    return null;
  }

  const intermediate = ELEMENT_GENERATES[fromElement];
  if (ELEMENT_GENERATES[intermediate] === toElement) {
    return intermediate;
  }

  return null;
}
