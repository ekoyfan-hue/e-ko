import { Lunar, Solar } from 'lunar-javascript';

export type Element = 'metal' | 'wood' | 'water' | 'fire' | 'earth';

export interface FlyingStar {
  number: number;
  name: string;
  element: Element;
  color: string;
}

export const FLYING_STARS: Record<number, FlyingStar> = {
  1: { number: 1, name: '一白水星', element: 'water', color: '#3B82F6' },
  2: { number: 2, name: '二黑土星', element: 'earth', color: '#78350F' },
  3: { number: 3, name: '三碧木星', element: 'wood', color: '#059669' },
  4: { number: 4, name: '四绿木星', element: 'wood', color: '#10B981' },
  5: { number: 5, name: '五黄土星', element: 'earth', color: '#EAB308' },
  6: { number: 6, name: '六白金星', element: 'metal', color: '#E5E7EB' },
  7: { number: 7, name: '七赤金星', element: 'metal', color: '#EF4444' },
  8: { number: 8, name: '八白土星', element: 'earth', color: '#F5F5DC' },
  9: { number: 9, name: '九紫火星', element: 'fire', color: '#A855F7' },
};

export function calculateLifeStar(birthYear: number, isMale: boolean): FlyingStar {
  const lastTwoDigits = birthYear % 100;

  let num: number;

  if (isMale) {
    const remainder = (100 - lastTwoDigits) % 9;
    num = remainder === 0 ? 9 : remainder;
    if (num === 5) num = 2;
  } else {
    const remainder = (lastTwoDigits - 4) % 9;
    num = remainder === 0 ? 9 : (remainder < 0 ? remainder + 9 : remainder);
    if (num === 5) num = 8;
  }

  return FLYING_STARS[num];
}

export function calculateDailyFlyingStar(date: Date): FlyingStar {
  const lunar = Lunar.fromDate(date);
  const dayNumber = lunar.getDay();
  const monthNumber = lunar.getMonth();

  let starNum = ((dayNumber + monthNumber) % 9) || 9;

  return FLYING_STARS[starNum];
}

export function getNinePalaceGrid(centerStar: number): number[][] {
  const basePattern = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  const offset = centerStar - 5;

  return basePattern.map(row =>
    row.map(num => {
      let newNum = num + offset;
      while (newNum > 9) newNum -= 9;
      while (newNum < 1) newNum += 9;
      return newNum;
    })
  );
}
