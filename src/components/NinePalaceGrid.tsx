import { FLYING_STARS } from '../utils/flyingStars';

interface NinePalaceGridProps {
  grid: number[][];
  centerStar: number;
}

const PALACE_NAMES = [
  ['巽', '离', '坤'],
  ['震', '中', '兑'],
  ['艮', '坎', '乾']
];

export function NinePalaceGrid({ grid, centerStar }: NinePalaceGridProps) {
  return (
    <div className="w-full max-w-[350px] mx-auto space-y-4">
      <div className="relative w-full aspect-square">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-3xl"></div>

        <div className="relative grid grid-cols-3 gap-2 p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-blue-500/30">
          {grid.map((row, rowIndex) =>
            row.map((starNum, colIndex) => {
              const star = FLYING_STARS[starNum];
              const isCenterPalace = rowIndex === 1 && colIndex === 1;
              const palaceName = PALACE_NAMES[rowIndex][colIndex];

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`relative aspect-square rounded-xl border-2 transition-all ${
                    isCenterPalace
                      ? 'bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-blue-900/40 border-blue-400 shadow-lg shadow-blue-500/50'
                      : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <div
                      className={`text-xs font-serif mb-1 ${
                        isCenterPalace ? 'text-blue-300' : 'text-slate-500'
                      }`}
                    >
                      {palaceName}
                    </div>

                    <div
                      className={`text-2xl font-bold mb-1 ${
                        isCenterPalace ? 'text-blue-300' : 'text-slate-300'
                      }`}
                      style={{ color: isCenterPalace ? '#93C5FD' : star.color }}
                    >
                      {starNum}
                    </div>

                    <div
                      className={`text-xs font-serif ${
                        isCenterPalace ? 'text-blue-400/90' : 'text-slate-400'
                      }`}
                    >
                      {star.name}
                    </div>
                  </div>

                  {isCenterPalace && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        今日
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-slate-500 text-sm font-light">
          今日入中：{FLYING_STARS[centerStar].name}
        </p>
      </div>
    </div>
  );
}
