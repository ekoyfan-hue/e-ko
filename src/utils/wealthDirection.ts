import type { Direction } from './luckyDirection';

export interface WealthDirectionInfo {
  direction: Direction;
  directionName: string;
  cityName: string;
  advice: string;
  detailedAdvice: string;
}

const DIRECTION_NAMES: Record<Direction, string> = {
  north: '正北',
  northeast: '东北',
  east: '正东',
  southeast: '东南',
  south: '正南',
  southwest: '西南',
  west: '正西',
  northwest: '西北',
  center: '中宫'
};

const NINE_PALACE_DIRECTIONS: Direction[] = [
  'southeast', 'south', 'southwest',
  'east', 'center', 'west',
  'northeast', 'north', 'northwest'
];

export function calculateWealthDirection(grid: number[][], cityName: string): WealthDirectionInfo {
  const safeCityName = cityName || '本地';
  let wealthDirection: Direction = 'center';
  let wealthDirectionName = '中宫';

  if (grid && Array.isArray(grid)) {
    grid.forEach((row, rowIndex) => {
      if (row && Array.isArray(row)) {
        row.forEach((starNum, colIndex) => {
          if (starNum === 8) {
            const directionIndex = rowIndex * 3 + colIndex;
            if (directionIndex >= 0 && directionIndex < NINE_PALACE_DIRECTIONS.length) {
              wealthDirection = NINE_PALACE_DIRECTIONS[directionIndex];
              wealthDirectionName = DIRECTION_NAMES[wealthDirection];
            }
          }
        });
      }
    });
  }

  const advice = `今日八白财星飞临${wealthDirectionName}方`;

  const detailedAdvice = `${safeCityName}的朋友，今日八白左辅财星飞临**${wealthDirectionName}**方。建议你在 **${safeCityName}** 的 **${wealthDirectionName}** 区域活动，或将办公桌、座位转向${wealthDirectionName}方位。此方主财运、升迁、喜庆，适合谈生意、签约投资、求财运。`;

  return {
    direction: wealthDirection,
    directionName: wealthDirectionName,
    cityName: safeCityName,
    advice,
    detailedAdvice
  };
}
