export type Direction = 'north' | 'northeast' | 'east' | 'southeast' | 'south' | 'southwest' | 'west' | 'northwest' | 'center';

export interface LuckyDirectionInfo {
  direction: Direction;
  directionName: string;
  starNumber: number;
  starName: string;
  benefit: string;
  advice: string;
}

const DIRECTION_NAMES: Record<Direction, string> = {
  north: '正北方',
  northeast: '东北方',
  east: '正东方',
  southeast: '东南方',
  south: '正南方',
  southwest: '西南方',
  west: '正西方',
  northwest: '西北方',
  center: '中宫'
};

const STAR_BENEFITS: Record<number, { benefit: string; advice: string }> = {
  1: {
    benefit: '一白文昌星，主智慧、学业、贵人',
    advice: '适合读书学习、写作办公、考试面试'
  },
  2: {
    benefit: '二黑病符星，需谨慎健康',
    advice: '避免此方位久坐，注意身体健康，不宜动土'
  },
  3: {
    benefit: '三碧是非星，易有口舌纷争',
    advice: '避免在此方位谈判争论，保持低调谨慎'
  },
  4: {
    benefit: '四绿文曲星，主文昌、桃花、姻缘',
    advice: '适合创作、社交、相亲约会、艺术创作'
  },
  5: {
    benefit: '五黄廉贞星，凶星需化解',
    advice: '此方位不宜动土，避免久留，需特别注意安全'
  },
  6: {
    benefit: '六白武曲星，主权力、事业、贵人',
    advice: '适合谈判合作、求职升迁、拜访领导'
  },
  7: {
    benefit: '七赤破军星，易有破财、小人',
    advice: '此方位需谨慎理财，防止盗窃，避免冲动消费'
  },
  8: {
    benefit: '八白财星，主财运、升迁、喜庆',
    advice: '适合谈生意、签约投资、买彩票、求财运'
  },
  9: {
    benefit: '九紫喜庆星，主婚嫁、喜事、名声',
    advice: '适合办喜事、求婚宴、社交活动、提升名气'
  }
};

const NINE_PALACE_DIRECTIONS: Direction[] = [
  'southeast', 'south', 'southwest',
  'east', 'center', 'west',
  'northeast', 'north', 'northwest'
];

export function calculateLuckyDirection(grid: number[][], cityName: string): LuckyDirectionInfo {
  let bestDirection: Direction = 'center';
  let bestStarNumber = 5;
  let maxPriority = -100;

  const starPriority: Record<number, number> = {
    8: 100,
    9: 90,
    1: 85,
    6: 80,
    4: 75,
    3: 20,
    7: 15,
    2: 10,
    5: 5
  };

  grid.forEach((row, rowIndex) => {
    row.forEach((starNum, colIndex) => {
      const directionIndex = rowIndex * 3 + colIndex;
      const direction = NINE_PALACE_DIRECTIONS[directionIndex];
      const priority = starPriority[starNum] || 0;

      if (priority > maxPriority && direction !== 'center') {
        maxPriority = priority;
        bestDirection = direction;
        bestStarNumber = starNum;
      }
    });
  });

  const starInfo = STAR_BENEFITS[bestStarNumber];
  const directionName = DIRECTION_NAMES[bestDirection];

  let advice = `身在${cityName}的你，今天的吉星方位在${directionName}。`;

  if (bestStarNumber === 8) {
    advice += `${starInfo.benefit}。如果今天要谈生意、签约投资或买彩票，强烈建议前往你所在城市的${directionName.replace('方', '')}区域，或者办公桌、座位面向${directionName.replace('方', '')}。财气加持，事半功倍。`;
  } else if (bestStarNumber === 9) {
    advice += `${starInfo.benefit}。今天适合参加社交活动、办喜事、求婚约会，建议前往${directionName.replace('方', '')}区域活动，或在家中${directionName}布置红色装饰。喜气盈门，好运连连。`;
  } else if (bestStarNumber === 1) {
    advice += `${starInfo.benefit}。今天${starInfo.advice}，建议在${directionName}位置学习工作，或前往${directionName.replace('方', '')}区域的图书馆、咖啡厅。文昌加持，思如泉涌。`;
  } else if (bestStarNumber === 6) {
    advice += `${starInfo.benefit}。今天${starInfo.advice}，建议将座位或办公桌朝向${directionName.replace('方', '')}，或前往此方位拜访重要人物。武曲加持，事业亨通。`;
  } else if (bestStarNumber === 4) {
    advice += `${starInfo.benefit}。今天${starInfo.advice}，建议在${directionName}摆放鲜花或绿植，或前往此方位进行创意工作。文曲加持，灵感迸发。`;
  } else {
    advice += `虽非大吉星，但相对今日其他方位较为平稳。建议保持谨慎，${starInfo.advice}。`;
  }

  return {
    direction: bestDirection,
    directionName,
    starNumber: bestStarNumber,
    starName: `${bestStarNumber === 1 ? '一' : bestStarNumber === 2 ? '二' : bestStarNumber === 3 ? '三' : bestStarNumber === 4 ? '四' : bestStarNumber === 5 ? '五' : bestStarNumber === 6 ? '六' : bestStarNumber === 7 ? '七' : bestStarNumber === 8 ? '八' : '九'}${bestStarNumber === 1 ? '白' : bestStarNumber === 2 ? '黑' : bestStarNumber === 3 ? '碧' : bestStarNumber === 4 ? '绿' : bestStarNumber === 5 ? '黄' : bestStarNumber === 6 ? '白' : bestStarNumber === 7 ? '赤' : bestStarNumber === 8 ? '白' : '紫'}`,
    benefit: starInfo.benefit,
    advice
  };
}
