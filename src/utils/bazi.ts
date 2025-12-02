import { Solar, Lunar } from 'lunar-javascript';
import type { Element } from './flyingStars';

export type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
export type EarthlyBranch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

export interface BaZiPillar {
  heavenlyStem: HeavenlyStem;
  earthlyBranch: EarthlyBranch;
  element: Element;
}

export interface BaZi {
  yearPillar: BaZiPillar;
  monthPillar: BaZiPillar;
  dayPillar: BaZiPillar;
  hourPillar: BaZiPillar;
  dayMaster: HeavenlyStem;
  dayMasterElement: Element;
}

const STEM_ELEMENTS: Record<HeavenlyStem, Element> = {
  '甲': 'wood',
  '乙': 'wood',
  '丙': 'fire',
  '丁': 'fire',
  '戊': 'earth',
  '己': 'earth',
  '庚': 'metal',
  '辛': 'metal',
  '壬': 'water',
  '癸': 'water'
};

const BRANCH_ELEMENTS: Record<EarthlyBranch, Element> = {
  '子': 'water',
  '丑': 'earth',
  '寅': 'wood',
  '卯': 'wood',
  '辰': 'earth',
  '巳': 'fire',
  '午': 'fire',
  '未': 'earth',
  '申': 'metal',
  '酉': 'metal',
  '戌': 'earth',
  '亥': 'water'
};

function createPillar(stem: string, branch: string): BaZiPillar {
  const heavenlyStem = stem as HeavenlyStem;
  const earthlyBranch = branch as EarthlyBranch;
  return {
    heavenlyStem,
    earthlyBranch,
    element: STEM_ELEMENTS[heavenlyStem]
  };
}

export function calculateBaZi(trueSolarDateTime: Date): BaZi {
  const year = trueSolarDateTime.getFullYear();
  const month = trueSolarDateTime.getMonth() + 1;
  const day = trueSolarDateTime.getDate();
  const hour = trueSolarDateTime.getHours();
  const minute = trueSolarDateTime.getMinutes();
  const second = trueSolarDateTime.getSeconds();

  const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  const yearGan = eightChar.getYearGan();
  const yearZhi = eightChar.getYearZhi();
  const monthGan = eightChar.getMonthGan();
  const monthZhi = eightChar.getMonthZhi();
  const dayGan = eightChar.getDayGan();
  const dayZhi = eightChar.getDayZhi();
  const timeGan = eightChar.getTimeGan();
  const timeZhi = eightChar.getTimeZhi();

  const yearPillar = createPillar(yearGan, yearZhi);
  const monthPillar = createPillar(monthGan, monthZhi);
  const dayPillar = createPillar(dayGan, dayZhi);
  const hourPillar = createPillar(timeGan, timeZhi);

  const dayMaster = dayGan as HeavenlyStem;
  const dayMasterElement = STEM_ELEMENTS[dayMaster];

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster,
    dayMasterElement
  };
}

export function getDayMasterName(dayMaster: HeavenlyStem): string {
  const names: Record<HeavenlyStem, string> = {
    '甲': '甲木',
    '乙': '乙木',
    '丙': '丙火',
    '丁': '丁火',
    '戊': '戊土',
    '己': '己土',
    '庚': '庚金',
    '辛': '辛金',
    '壬': '壬水',
    '癸': '癸水'
  };
  return names[dayMaster];
}

export function getDayMasterDescription(dayMaster: HeavenlyStem): string {
  const descriptions: Record<HeavenlyStem, string> = {
    '甲': '甲木如参天大树，刚直不屈，有领导力和开创精神',
    '乙': '乙木如花草藤蔓，柔韧灵活，适应力强且富有艺术气质',
    '丙': '丙火如太阳之火，热情奔放，光明磊落，具有强大的感染力',
    '丁': '丁火如烛光灯火，温柔细腻，善于照亮他人，心思缜密',
    '戊': '戊土如高山大地，稳重厚实，包容力强，可靠值得信赖',
    '己': '己土如田园之土，温和谦逊，善于培育，注重实际',
    '庚': '庚金如刀剑钢铁，刚毅果断，正义凛然，有原则和担当',
    '辛': '辛金如珠玉首饰，精致细腻，品味高雅，追求完美',
    '壬': '壬水如江河湖海，智慧深邃，变通灵活，胸怀广阔',
    '癸': '癸水如雨露甘泉，温润柔和，滋养万物，细腻敏感'
  };
  return descriptions[dayMaster];
}

export function formatBaZi(bazi: BaZi): string {
  return `${bazi.yearPillar.heavenlyStem}${bazi.yearPillar.earthlyBranch} ${bazi.monthPillar.heavenlyStem}${bazi.monthPillar.earthlyBranch} ${bazi.dayPillar.heavenlyStem}${bazi.dayPillar.earthlyBranch} ${bazi.hourPillar.heavenlyStem}${bazi.hourPillar.earthlyBranch}`;
}
