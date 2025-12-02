import type { Element } from './flyingStars';

export type ElementRelation = 'generate' | 'control' | 'same' | 'drain';

export interface ElementInteraction {
  relation: ElementRelation;
  luckyLevel: number;
  description: string;
}

const GENERATION_CYCLE: Record<Element, Element> = {
  wood: 'fire',
  fire: 'earth',
  earth: 'metal',
  metal: 'water',
  water: 'wood'
};

const CONTROL_CYCLE: Record<Element, Element> = {
  wood: 'earth',
  earth: 'water',
  water: 'fire',
  fire: 'metal',
  metal: 'wood'
};

export function analyzeElementInteraction(
  dailyElement: Element,
  userElement: Element
): ElementInteraction {
  if (dailyElement === userElement) {
    return {
      relation: 'same',
      luckyLevel: 4,
      description: '今日世界的频率与你内在完美共振。像是找到了自己的节奏，一切自然流动。这是属于你的主场，放松地做自己就好。'
    };
  }

  if (GENERATION_CYCLE[dailyElement] === userElement) {
    return {
      relation: 'generate',
      luckyLevel: 5,
      description: '今日宇宙的能量正温柔地滋养着你。像春雨润物，像晨光唤醒，你的每个想法都能轻易生根发芽。这是顺流而上的一天，勇敢地迈出那一步。'
    };
  }

  if (GENERATION_CYCLE[userElement] === dailyElement) {
    return {
      relation: 'drain',
      luckyLevel: 3,
      description: '今日你像一棵给予果实的树，能量在流出。适合滋养他人，但记得也要照顾自己。像呼吸一样，给予之后，也要允许自己接收。'
    };
  }

  if (CONTROL_CYCLE[dailyElement] === userElement) {
    return {
      relation: 'control',
      luckyLevel: 2,
      description: '今日世界有些嘈杂，外界的声音可能会挑战你内心的秩序。像深海中的潜水员，保持冷静与深邃，让纷扰自然沉淀。这是磨合期，也是成长期。'
    };
  }

  if (CONTROL_CYCLE[userElement] === dailyElement) {
    return {
      relation: 'drain',
      luckyLevel: 3,
      description: '今日你掌握着主动权，但力量需要智慧引导。像驯服烈马，既要展现决心，也要保持温柔。适度的控制，才能持久。'
    };
  }

  return {
    relation: 'same',
    luckyLevel: 3,
    description: '今日如同平静的湖面，没有波澜壮阔，也没有暗流涌动。这是休憩的时刻，顺应自然的节奏，让一切缓缓发生。'
  };
}

export function getMediatingElement(controller: Element, controlled: Element): Element | null {
  for (const [elem, generates] of Object.entries(GENERATION_CYCLE)) {
    const element = elem as Element;
    if (GENERATION_CYCLE[controller] === element && generates === controlled) {
      return element;
    }
  }
  return null;
}
