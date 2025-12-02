import type { Element } from './flyingStars';
import type { ColorRecommendation } from './outfitRecommendation';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonalAdjustment {
  season: Season;
  seasonName: string;
  dominantElement: Element;
  balanceColors: ColorRecommendation[];
  priority: 'high' | 'normal';
  explanation: string;
}

const SEASONAL_COLORS: Record<Season, ColorRecommendation[]> = {
  spring: [
    { name: '金色', hex: '#F59E0B', priority: 'primary' },
    { name: '银白色', hex: '#E5E7EB', priority: 'primary' },
    { name: '朱红色', hex: '#DC2626', priority: 'secondary' }
  ],
  summer: [
    { name: '深海蓝', hex: '#1E40AF', priority: 'primary' },
    { name: '墨黑色', hex: '#111827', priority: 'primary' },
    { name: '深灰色', hex: '#374151', priority: 'secondary' }
  ],
  autumn: [
    { name: '翠绿色', hex: '#10B981', priority: 'primary' },
    { name: '青绿色', hex: '#059669', priority: 'primary' },
    { name: '墨黑色', hex: '#111827', priority: 'secondary' }
  ],
  winter: [
    { name: '暖橙色', hex: '#EA580C', priority: 'primary' },
    { name: '朱红色', hex: '#DC2626', priority: 'primary' },
    { name: '姜黄色', hex: '#EAB308', priority: 'secondary' }
  ]
};

export function getSeasonFromMonth(month: number): Season {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

export function analyzeSeasonalAdjustment(birthMonth: number): SeasonalAdjustment {
  const season = getSeasonFromMonth(birthMonth);

  const adjustments: Record<Season, SeasonalAdjustment> = {
    spring: {
      season: 'spring',
      seasonName: '春季',
      dominantElement: 'wood',
      balanceColors: SEASONAL_COLORS.spring,
      priority: 'normal',
      explanation: '建议佩戴金属配饰或红色单品来修剪旺木，使气场平衡。'
    },
    summer: {
      season: 'summer',
      seasonName: '夏季',
      dominantElement: 'fire',
      balanceColors: SEASONAL_COLORS.summer,
      priority: 'high',
      explanation: '建议使用蓝色或黑色来降温调和，平衡燥热之气。'
    },
    autumn: {
      season: 'autumn',
      seasonName: '秋季',
      dominantElement: 'metal',
      balanceColors: SEASONAL_COLORS.autumn,
      priority: 'normal',
      explanation: '建议搭配绿色或黑色来柔化金气，增添生机。'
    },
    winter: {
      season: 'winter',
      seasonName: '冬季',
      dominantElement: 'water',
      balanceColors: SEASONAL_COLORS.winter,
      priority: 'high',
      explanation: '建议使用红色、橙色等暖色系来暖局，驱散寒气。'
    }
  };

  return adjustments[season];
}

export function getSeasonalExplanation(
  userElementName: string,
  seasonalAdj: SeasonalAdjustment
): string {
  if (!userElementName || !seasonalAdj || !seasonalAdj.seasonName || !seasonalAdj.explanation) {
    return '';
  }
  const seasonElement = seasonalAdj.dominantElement === 'wood' ? '木' : seasonalAdj.dominantElement === 'fire' ? '火' : seasonalAdj.dominantElement === 'metal' ? '金' : seasonalAdj.dominantElement === 'water' ? '水' : '土';
  return `你是${userElementName}，生于${seasonalAdj.seasonName}（${seasonElement}旺）。${seasonalAdj.explanation}`;
}
