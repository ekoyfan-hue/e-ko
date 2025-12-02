import type { Element } from './flyingStars';

export const ELEMENTAL_QUOTES: Record<Element, string[]> = {
  wood: [
    '像树木一样，在喧嚣中通过向下扎根，获得向上的力量。',
    '允许自己缓慢生长，不必急着成为玫瑰。',
    '今日宜：舒展；忌：紧绷。把春天穿在身上。',
    '柔软的身段，往往比坚硬的壳更强大。'
  ],
  fire: [
    '你本就光芒万丈，不必借谁的光。',
    '热情是最高级的能量，去点燃沉闷的生活。',
    '与其在黑暗中等待，不如让自己成为光源。',
    '今日气场关键词：明媚。让世界看到你的热烈。'
  ],
  earth: [
    '在不确定的世界里，做自己最稳的靠山。',
    '万物生长，皆以此为基。稳住，就能赢。',
    '厚积薄发。把心沉下来，答案自然浮现。',
    '大地的能量是安静的，但也是最深厚的。'
  ],
  metal: [
    '做减法，是最高级的活法。',
    '保持棱角，是因为不想被平庸磨平。',
    '理智是你今日最迷人的性感。',
    '像钻石一样，既通透，又坚硬。'
  ],
  water: [
    '上善若水，利万物而不争。',
    '遇到障碍就绕过去，流动的能量才不会腐坏。',
    '深邃，是因为内心装得下星辰大海。',
    '以柔克刚。安静的力量，往往最震耳欲聋。'
  ]
};

export function getRandomQuote(element: Element): string {
  const quotes = ELEMENTAL_QUOTES[element];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
