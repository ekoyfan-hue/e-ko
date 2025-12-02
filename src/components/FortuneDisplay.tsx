import { useState } from 'react';
import { Compass, Star, Sparkles, Navigation, MapPin, ChevronLeft, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { NinePalaceGrid } from './NinePalaceGrid';
import { ShareModal } from './ShareModal';
import type { FlyingStar } from '../utils/flyingStars';
import type { ElementInteraction } from '../utils/fiveElements';
import type { OutfitRecommendation } from '../utils/outfitRecommendation';
import type { LuckyDirectionInfo } from '../utils/luckyDirection';
import type { WealthDirectionInfo } from '../utils/wealthDirection';
import type { BaZi } from '../utils/bazi';
import type { BaziAnalysis } from '../utils/baziStrength';

interface FortuneDisplayProps {
  userStar: FlyingStar;
  dailyStar: FlyingStar;
  grid: number[][];
  interaction: ElementInteraction;
  outfit: OutfitRecommendation;
  luckyDirection: LuckyDirectionInfo;
  wealthDirection: WealthDirectionInfo;
  bazi: BaZi;
  baziString: string;
  baziAnalysis: BaziAnalysis;
  dayMasterName: string;
  dayMasterDescription: string;
  birthCity: string;
  currentCity: string;
  clockTime: string;
  trueSolarTime: string;
  onReset: () => void;
}

export function FortuneDisplay({
  userStar,
  dailyStar,
  grid,
  interaction,
  outfit,
  luckyDirection,
  wealthDirection,
  bazi,
  baziString,
  baziAnalysis,
  dayMasterName,
  dayMasterDescription,
  birthCity,
  currentCity,
  clockTime,
  trueSolarTime,
  onReset
}: FortuneDisplayProps) {
  const [isGridExpanded, setIsGridExpanded] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const deduplicateColors = (colors: Array<{ name: string; hex: string; priority?: string }>) => {
    if (!colors || !Array.isArray(colors)) {
      return [{ name: '土黄色', hex: '#eab308', priority: 'primary' }];
    }
    const seen = new Set<string>();
    const deduped = colors.filter(color => {
      if (!color || !color.hex) return false;
      if (seen.has(color.hex)) {
        return false;
      }
      seen.add(color.hex);
      return true;
    });
    return deduped.length > 0 ? deduped : [{ name: '土黄色', hex: '#eab308', priority: 'primary' }];
  };

  const uniqueLuckyColors = deduplicateColors(outfit?.luckyColors);

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const generateFortuneQuote = () => {
    const quotes = [
      `作为${dayMasterName}能量的你，今日磁场指数${luckyLevel}颗星。${wealthDirection.directionName}方是你的灵感方位，让思绪向那里流动。`,
      `今日用${uniqueLuckyColors[0]?.name}色包裹自己，像穿上了一层能量护甲，让内心更加笃定。`,
      `${wealthDirection.directionName}方今日为你打开了一扇窗，新的可能性正在那里等待。`,
      `世界的节奏今日与你共振。穿上${uniqueLuckyColors[0]?.name}色，让能量自然流动，一切都会恰到好处。`
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const luckyLevel = interaction.luckyLevel;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Soft Gradient Orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-br from-violet-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-violet-200/40">
        <div className="relative max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-violet-600 hover:text-violet-700 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
            <span className="font-light">重新感知</span>
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors"
            title="分享"
          >
            <Share2 className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto p-4 md:p-6 pb-20 space-y-6 md:space-y-8 mt-6">
        {/* Date and Location Info */}
        <div className="text-center space-y-2">
          <p className="text-slate-500 text-sm font-light">{today}</p>
          <p className="text-violet-600/80 text-sm font-light">{currentCity}</p>
        </div>

        {/* 1. Compact Identity & Luck Card */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-violet-200/30">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Identity */}
            <div className="flex-1">
              <div className="text-slate-500 text-xs mb-1 font-light">你的内在能量</div>
              <div className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600">
                {dayMasterName} 命
              </div>
              <div className="text-slate-500 text-xs mt-1 font-light">本质 {userStar.name}</div>
            </div>

            {/* Divider */}
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-violet-300/50 to-transparent"></div>

            {/* Right: Today's Luck */}
            <div className="flex-1 text-right">
              <div className="text-slate-500 text-xs mb-1 font-light">今日磁场</div>
              <div className="flex justify-end items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < interaction.luckyLevel
                        ? 'text-violet-500 fill-violet-500'
                        : 'text-slate-300'
                    }`}
                    strokeWidth={1}
                  />
                ))}
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="text-violet-600 text-xs font-light">能量色</span>
                {uniqueLuckyColors.slice(0, 2).map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Today's Energy & Outfit Guide */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-violet-200/30 space-y-8">
          <h2 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-500" strokeWidth={1.5} />
            今日能量指引
          </h2>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex gap-4">
              {uniqueLuckyColors.map((color, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 rounded-full border-2 border-white shadow-xl hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: `0 8px 24px ${color.hex}30`
                    }}
                  ></div>
                  <span className="text-violet-600 text-xs mt-2 block font-light">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>

            {outfit.avoidColors.length > 0 && (
              <>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                <div className="flex gap-3 opacity-40">
                  {outfit.avoidColors.map((color, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-10 h-10 rounded-full border border-slate-300"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <span className="text-slate-500 text-xs mt-1 block line-through font-light">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {outfit.accessories.map((item, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 px-5 py-2 rounded-full text-sm border border-violet-200/50 shadow-sm font-light"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="bg-gradient-to-br from-violet-50/80 to-blue-50/80 border border-violet-200/40 rounded-2xl p-6 space-y-4">
            {(() => {
              const parts = [];

              if (outfit.dualEngineExplanation) {
                const dualParts = outfit.dualEngineExplanation.split('\n\n');
                parts.push(dualParts[0]);
                if (dualParts[1]) {
                  parts.push(dualParts[1]);
                }
              }

              if (outfit.seasonalExplanation && outfit.seasonalAdjustment && outfit.seasonalAdjustment.priority === 'high') {
                parts.push(outfit.seasonalExplanation);
              }

              return (
                <div className="text-slate-700 leading-relaxed text-sm space-y-3 font-light">
                  {parts.map((part, index) => (
                    <p key={index}>{part}</p>
                  ))}
                </div>
              );
            })()}

            <div className="pt-3 border-t border-violet-200/40 flex items-center justify-between text-xs">
              <span className="text-violet-600/70 font-light">八字日主 × 九宫飞星</span>
              {outfit.seasonalAdjustment?.priority === 'high' && (
                <span className="bg-violet-200/50 text-violet-700 px-3 py-1 rounded-full border border-violet-300/30 font-light">
                  寒暖平衡
                </span>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border border-blue-200/40 rounded-2xl p-5">
            <p className="text-slate-600 leading-relaxed text-sm text-center font-light">
              {outfit.style}
            </p>
          </div>
        </div>

        {/* 3. Wealth Direction Compass */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-violet-200/30">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 flex items-center gap-2">
              <Compass className="w-6 h-6 text-violet-500" strokeWidth={1.5} />
              灵感方位
            </h2>
            <div className="flex items-center gap-2 bg-violet-100/80 px-4 py-2 rounded-full border border-violet-200/50">
              <MapPin className="w-4 h-4 text-violet-600" strokeWidth={1.5} />
              <span className="text-violet-700 font-light text-sm">{currentCity}</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-block">
              <div className="relative mb-4">
                <div
                  className="text-7xl font-light mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 4px 12px rgba(139, 92, 246, 0.2))'
                  }}
                >
                  {wealthDirection.directionName}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-violet-600 text-base font-light">
                <Navigation className="w-5 h-5" strokeWidth={1.5} />
                <span>{wealthDirection.advice}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50/80 to-cyan-50/80 border border-violet-200/40 rounded-2xl p-6">
            <p className="text-slate-700 leading-relaxed text-sm text-center font-light">
              {wealthDirection.detailedAdvice}
            </p>
          </div>
        </div>

        {/* 4. Flying Stars Grid - Collapsible Bottom Section */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl overflow-hidden shadow-xl shadow-violet-200/30">
          <button
            onClick={() => setIsGridExpanded(!isGridExpanded)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-violet-50/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-violet-500" strokeWidth={1.5} />
              <h2 className="text-lg font-light text-slate-700">能量流动图 (数据参考)</h2>
            </div>
            {isGridExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
            )}
          </button>

          {isGridExpanded && (
            <div className="px-6 pb-6 space-y-6">
              <div className="border-t border-violet-200/40 pt-6">
                <NinePalaceGrid grid={grid} centerStar={dailyStar.number} />
              </div>

              <div className="bg-gradient-to-br from-violet-50/80 to-blue-50/80 border border-violet-200/40 rounded-2xl p-4 md:p-6 space-y-5">
                <div className="text-center">
                  <div className="text-lg md:text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 mb-2">
                    你的内在 {dayMasterName} 能量
                  </div>
                  <div className="text-slate-600 text-sm leading-relaxed font-light">
                    {dayMasterDescription}
                  </div>
                </div>

                <div className="w-full grid grid-cols-4 gap-2">
                  <div className="bg-white/60 rounded-xl p-2 border border-violet-200/40 text-center">
                    <div className="text-slate-500 text-xs mb-1 font-light">年柱</div>
                    <div className="text-violet-700 font-light text-sm">{bazi.yearPillar.heavenlyStem}{bazi.yearPillar.earthlyBranch}</div>
                  </div>
                  <div className="bg-white/60 rounded-xl p-2 border border-violet-200/40 text-center">
                    <div className="text-slate-500 text-xs mb-1 font-light">月柱</div>
                    <div className="text-violet-700 font-light text-sm">{bazi.monthPillar.heavenlyStem}{bazi.monthPillar.earthlyBranch}</div>
                  </div>
                  <div className="bg-white/60 rounded-xl p-2 border border-violet-200/40 text-center">
                    <div className="text-slate-500 text-xs mb-1 font-light">日柱</div>
                    <div className="text-violet-700 font-light text-sm">{bazi.dayPillar.heavenlyStem}{bazi.dayPillar.earthlyBranch}</div>
                  </div>
                  <div className="bg-white/60 rounded-xl p-2 border border-violet-200/40 text-center">
                    <div className="text-slate-500 text-xs mb-1 font-light">时柱</div>
                    <div className="text-violet-700 font-light text-sm">{bazi.hourPillar.heavenlyStem}{bazi.hourPillar.earthlyBranch}</div>
                  </div>
                </div>

                <div className="bg-white/60 rounded-2xl p-4 border border-violet-200/40 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-light">出生地</span>
                    <span className="text-violet-700 font-light">{birthCity}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-light">时钟时间</span>
                    <span className="text-violet-700 font-light">{clockTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-t border-violet-200/40 pt-2">
                    <span className="text-slate-600 font-light">真太阳时</span>
                    <span className="text-violet-700 font-light">{trueSolarTime}</span>
                  </div>
                </div>

                <div className="text-center text-slate-500 text-xs font-light">
                  基于真实时空 · 经纬校准
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 border border-blue-200/40 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-violet-500" strokeWidth={1.5} />
                  <h3 className="text-lg font-light text-slate-700">磁场解读</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm font-light">
                  {interaction.description}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-slate-400 text-xs py-4 font-light">
          <p>感知能量 · 找回平衡 · 每日更新</p>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        dayMasterName={dayMasterName}
        luckyColors={uniqueLuckyColors}
        luckyElement={outfit.luckyElement}
        wealthDirection={wealthDirection.directionName}
        luckyLevel={luckyLevel}
        fortuneQuote={generateFortuneQuote()}
        currentCity={currentCity}
      />
    </div>
  );
}
