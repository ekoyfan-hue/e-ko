import type { Element } from './flyingStars';
import type { ElementRelation } from './fiveElements';
import { getMediatingElement } from './fiveElements';
import { analyzeSeasonalAdjustment, getSeasonalExplanation } from './seasonalAdjustment';
import type { SeasonalAdjustment } from './seasonalAdjustment';
import type { BaziAnalysis } from './baziStrength';
import { findMediatingElement } from './baziStrength';

export interface ColorRecommendation {
  name: string;
  hex: string;
  priority: 'primary' | 'secondary' | 'accent';
}

export interface OutfitRecommendation {
  luckyColors: ColorRecommendation[];
  avoidColors: ColorRecommendation[];
  accessories: string[];
  style: string;
  advice: string;
  luckyElement: Element;
  seasonalAdjustment?: SeasonalAdjustment;
  seasonalExplanation?: string;
  dualEngineExplanation?: string;
}

const ELEMENT_COLORS: Record<Element, ColorRecommendation[]> = {
  metal: [
    { name: '银白色', hex: '#E5E7EB', priority: 'primary' },
    { name: '金色', hex: '#F59E0B', priority: 'primary' },
    { name: '铂灰色', hex: '#9CA3AF', priority: 'secondary' }
  ],
  wood: [
    { name: '青绿色', hex: '#059669', priority: 'primary' },
    { name: '翠绿色', hex: '#10B981', priority: 'primary' },
    { name: '碧蓝色', hex: '#06B6D4', priority: 'secondary' }
  ],
  water: [
    { name: '深蓝色', hex: '#1E40AF', priority: 'primary' },
    { name: '黑色', hex: '#111827', priority: 'primary' },
    { name: '湖蓝色', hex: '#3B82F6', priority: 'secondary' }
  ],
  fire: [
    { name: '朱红色', hex: '#DC2626', priority: 'primary' },
    { name: '橙色', hex: '#EA580C', priority: 'primary' },
    { name: '粉紫色', hex: '#EC4899', priority: 'secondary' }
  ],
  earth: [
    { name: '土黄色', hex: '#EAB308', priority: 'primary' },
    { name: '棕色', hex: '#78350F', priority: 'primary' },
    { name: '米色', hex: '#F5F5DC', priority: 'secondary' }
  ]
};

const ELEMENT_ACCESSORIES: Record<Element, string[]> = {
  metal: ['金属手镯', '银质项链', '珍珠耳环', '金属腰带', '钢笔'],
  wood: ['木质手串', '植物配饰', '棉麻围巾', '竹编包', '藤编配饰'],
  water: ['水晶饰品', '玻璃制品', '流苏配饰', '丝质围巾', '珍珠'],
  fire: ['红色配饰', '亮色丝巾', '光泽首饰', '皮革制品', '漆器'],
  earth: ['陶瓷配饰', '玉石挂件', '石质手串', '皮质包袋', '方形配饰']
};

const ELEMENT_STYLE: Record<Element, string> = {
  metal: '利落简约，线条分明，金属质感',
  wood: '自然飘逸，舒适柔软，层次丰富',
  water: '流动柔美，深邃神秘，曲线优雅',
  fire: '热情奔放，光彩夺目，张扬个性',
  earth: '稳重大方，厚实温暖，质朴典雅'
};

const ELEMENT_NAMES: Record<Element, string> = {
  metal: '金',
  wood: '木',
  water: '水',
  fire: '火',
  earth: '土'
};

function checkElementConflict(element1: Element, element2: Element): boolean {
  const conflictPairs: Record<Element, Element> = {
    water: 'fire',
    fire: 'metal',
    metal: 'wood',
    wood: 'earth',
    earth: 'water'
  };
  return conflictPairs[element1] === element2 || conflictPairs[element2] === element1;
}

function getElementGenerates(element: Element): Element {
  const generates: Record<Element, Element> = {
    wood: 'fire',
    fire: 'earth',
    earth: 'metal',
    metal: 'water',
    water: 'wood'
  };
  return generates[element];
}

export function generateOutfitRecommendation(
  dailyElement: Element,
  userElement: Element,
  relation: ElementRelation,
  birthMonth?: number,
  baziAnalysis?: BaziAnalysis
): OutfitRecommendation {
  let luckyColors: ColorRecommendation[] = [];
  let avoidColors: ColorRecommendation[] = [];
  let accessories: string[] = [];
  let style: string = '';
  let advice: string = '';
  let dualEngineExplanation: string | undefined;
  let luckyElement: Element = userElement;

  if (baziAnalysis) {
    const primaryFavorable = baziAnalysis.favorableElements[0];
    const secondaryFavorable = baziAnalysis.favorableElements[1] || primaryFavorable;

    const hasConflict = baziAnalysis.favorableElements.some(fav => checkElementConflict(fav, dailyElement));

    if (hasConflict) {
      const conflictedElement = baziAnalysis.favorableElements.find(fav => checkElementConflict(fav, dailyElement));
      const mediator = findMediatingElement(dailyElement, conflictedElement!);

      if (mediator) {
        luckyElement = mediator;
        luckyColors = [...ELEMENT_COLORS[mediator].slice(0, 2), ...ELEMENT_COLORS[primaryFavorable].slice(0, 1)];
        accessories = ELEMENT_ACCESSORIES[mediator];
        style = ELEMENT_STYLE[mediator];

        const strengthDesc = baziAnalysis.strength === 'weak' ? '身弱' : '身强';
        dualEngineExplanation = `你的日主为${strengthDesc}，${baziAnalysis.explanation.split('。')[1]}但今日${getDailyStarName(dailyElement)}当值，与你的喜用神${ELEMENT_NAMES[conflictedElement!]}相冲。\n\n💡 **今日穿搭策略**：请务必穿着**${getColorDescription(mediator)}**。${ELEMENT_NAMES[mediator]}能吸收今日的${ELEMENT_NAMES[dailyElement]}气，转化来生旺你的${ELEMENT_NAMES[conflictedElement!]}。这叫"通关化煞"，是你今天的最强护身符。`;

        avoidColors = [...ELEMENT_COLORS[dailyElement].slice(0, 1), ...ELEMENT_COLORS[baziAnalysis.unfavorableElements[0]].slice(0, 1)];
      } else {
        luckyElement = primaryFavorable;
        luckyColors = [...ELEMENT_COLORS[primaryFavorable].slice(0, 2), ...ELEMENT_COLORS[secondaryFavorable].slice(0, 1)];
        accessories = ELEMENT_ACCESSORIES[primaryFavorable];
        style = ELEMENT_STYLE[primaryFavorable];

        dualEngineExplanation = `${baziAnalysis.explanation}今日${getDailyStarName(dailyElement)}当值，建议穿着你的喜用色**${getColorDescription(primaryFavorable)}**来补足能量，化解不利影响。`;

        avoidColors = [...ELEMENT_COLORS[dailyElement].slice(0, 1), ...ELEMENT_COLORS[baziAnalysis.unfavorableElements[0]].slice(0, 1)];
      }
    } else if (baziAnalysis.favorableElements.includes(dailyElement)) {
      luckyElement = dailyElement;
      luckyColors = [...ELEMENT_COLORS[dailyElement].slice(0, 2), ...ELEMENT_COLORS[primaryFavorable].slice(0, 1)];
      accessories = ELEMENT_ACCESSORIES[dailyElement];
      style = ELEMENT_STYLE[dailyElement];

      dualEngineExplanation = `${baziAnalysis.explanation}今日${getDailyStarName(dailyElement)}当值，正是你的喜用神！天时地利人和，穿着**${getColorDescription(dailyElement)}**顺势而为，运势大旺。今日适合主动出击，把握良机。`;

      avoidColors = ELEMENT_COLORS[baziAnalysis.unfavorableElements[0]].slice(0, 2);
    } else {
      const mediatorToFavorable = getElementGenerates(dailyElement);
      if (baziAnalysis.favorableElements.includes(mediatorToFavorable)) {
        luckyElement = mediatorToFavorable;
        luckyColors = [...ELEMENT_COLORS[mediatorToFavorable].slice(0, 2), ...ELEMENT_COLORS[primaryFavorable].slice(0, 1)];
        accessories = ELEMENT_ACCESSORIES[mediatorToFavorable];
        style = ELEMENT_STYLE[mediatorToFavorable];

        dualEngineExplanation = `${baziAnalysis.explanation}今日${getDailyStarName(dailyElement)}可生旺${ELEMENT_NAMES[mediatorToFavorable]}，恰好是你的喜用神。穿着**${getColorDescription(mediatorToFavorable)}**承接今日的能量，转化为你的助力。`;
      } else {
        luckyElement = primaryFavorable;
        luckyColors = [...ELEMENT_COLORS[primaryFavorable].slice(0, 2), ...ELEMENT_COLORS[secondaryFavorable].slice(0, 1)];
        accessories = ELEMENT_ACCESSORIES[primaryFavorable];
        style = ELEMENT_STYLE[primaryFavorable];

        dualEngineExplanation = `${baziAnalysis.explanation}今日${getDailyStarName(dailyElement)}与你的八字关系平和。建议穿着你的喜用色**${getColorDescription(primaryFavorable)}**来强化自身能量场，稳步前行。`;
      }

      avoidColors = ELEMENT_COLORS[baziAnalysis.unfavorableElements[0]].slice(0, 2);
    }

    advice = dualEngineExplanation.split('\n\n')[0];
  } else {
    switch (relation) {
      case 'control':
        const mediator = getMediatingElement(dailyElement, userElement);
        if (mediator) {
          luckyElement = mediator;
          luckyColors = ELEMENT_COLORS[mediator];
          accessories = ELEMENT_ACCESSORIES[mediator];
          style = ELEMENT_STYLE[mediator];
          advice = `今日飞星克制你的本命，建议穿着${ELEMENT_NAMES[mediator]}系色彩通关化解。以柔克刚，化险为夷。`;
        } else {
          luckyColors = ELEMENT_COLORS[userElement];
          accessories = ELEMENT_ACCESSORIES[userElement];
          style = ELEMENT_STYLE[userElement];
          advice = '今日需加强自身能量，穿着本命色系增强气场，谨慎行事。';
        }
        avoidColors = ELEMENT_COLORS[dailyElement];
        break;

      case 'generate':
        luckyColors = ELEMENT_COLORS[userElement];
        accessories = ELEMENT_ACCESSORIES[userElement];
        style = ELEMENT_STYLE[userElement];
        advice = '今日飞星生旺你的本命，穿着本命色系顺势而为，大展宏图。适合主动出击，把握机遇。';
        avoidColors = ELEMENT_COLORS[dailyElement].filter(c => c.priority === 'secondary');
        break;

      case 'same':
        luckyColors = ELEMENT_COLORS[userElement];
        accessories = [...ELEMENT_ACCESSORIES[userElement]].slice(0, 3);
        style = ELEMENT_STYLE[userElement];
        advice = '今日飞星与你本命共鸣，穿着本命色系形成能量共振，运势旺盛。宜果断决策，自信前行。';
        avoidColors = [];
        break;

      case 'drain':
        luckyColors = ELEMENT_COLORS[userElement];
        accessories = ELEMENT_ACCESSORIES[userElement].slice(0, 2);
        style = ELEMENT_STYLE[userElement];
        advice = '今日能量有所耗损，穿着本命色系补充能量，保持低调，以静制动。适合内修，不宜过度消耗。';
        avoidColors = ELEMENT_COLORS[dailyElement].filter(c => c.priority === 'primary');
        break;
    }
  }

  let seasonalAdjustment: SeasonalAdjustment | undefined;
  let seasonalExplanation: string | undefined;

  if (birthMonth !== undefined) {
    seasonalAdjustment = analyzeSeasonalAdjustment(birthMonth);
    const userElementName = ELEMENT_NAMES[userElement];
    seasonalExplanation = getSeasonalExplanation(userElementName, seasonalAdjustment);
  }

  return {
    luckyColors: luckyColors.slice(0, 3),
    avoidColors: avoidColors.slice(0, 2),
    accessories: accessories.slice(0, 3),
    style,
    advice,
    luckyElement,
    seasonalAdjustment,
    seasonalExplanation,
    dualEngineExplanation
  };
}

function getDailyStarName(element: Element): string {
  const names: Record<Element, string> = {
    water: '一白水星',
    earth: '二黑土星',
    wood: '三碧木星',
    fire: '九紫火星',
    metal: '六白金星'
  };
  return names[element] || `${ELEMENT_NAMES[element]}星`;
}

function getColorDescription(element: Element): string {
  const descriptions: Record<Element, string> = {
    wood: '绿色/青色（木）',
    fire: '红色/橙色（火）',
    earth: '黄色/棕色（土）',
    metal: '白色/金色（金）',
    water: '蓝色/黑色（水）'
  };
  return descriptions[element];
}
