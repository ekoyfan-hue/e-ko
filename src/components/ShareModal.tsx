import { useRef, useState, useEffect } from 'react';
import { X, Download, Compass, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import type { Element } from '../utils/flyingStars';
import { getRandomQuote } from '../utils/elementalQuotes';
import { ExportPoster } from './ExportPoster';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayMasterName: string;
  luckyColors: Array<{ name: string; hex: string }>;
  luckyElement: Element;
  wealthDirection: string;
  luckyLevel: number;
  fortuneQuote: string;
  currentCity: string;
}

export function ShareModal({
  isOpen,
  onClose,
  dayMasterName,
  luckyColors,
  luckyElement,
  wealthDirection,
  luckyLevel,
  fortuneQuote,
  currentCity
}: ShareModalProps) {
  const offscreenRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const elementalQuote = getRandomQuote(luckyElement);

  useEffect(() => {
    if (isOpen && offscreenRef.current) {
      offscreenRef.current.style.left = '-9999px';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const handleDownload = async () => {
    if (!offscreenRef.current) return;

    setIsDownloading(true);
    try {
      offscreenRef.current.style.left = '0';

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(offscreenRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        width: 375,
        scrollY: 0,
        scrollX: 0
      });

      offscreenRef.current.style.left = '-9999px';

      const link = document.createElement('a');
      link.download = `气场局_${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请尝试截屏保存');
      if (offscreenRef.current) {
        offscreenRef.current.style.left = '-9999px';
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* On-screen Modal for Preview */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
        <div
          className="absolute inset-0 bg-white/90 backdrop-blur-xl"
          onClick={onClose}
        ></div>

        <div className="relative w-full max-w-md z-10 flex flex-col items-center gap-4">
          <button
            onClick={onClose}
            className="self-end mb-2 p-2 rounded-full bg-white/90 hover:bg-white border border-violet-200/50 text-slate-600 hover:text-slate-800 transition-colors shadow-lg"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>

          <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden relative border border-violet-200/30">
            <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-violet-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>

            <div className="relative h-full flex flex-col p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Compass className="w-6 h-6 text-violet-500 animate-spin" style={{ animationDuration: '30s' }} strokeWidth={1} />
                  <h1 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600">
                    气场局 Qi Lab
                  </h1>
                </div>
                <p className="text-slate-500 text-sm font-light">{today}</p>
                <p className="text-violet-600/70 text-xs mt-1 font-light">{currentCity}</p>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center space-y-6">
                <div className="text-center">
                  <div className="text-slate-500 text-sm mb-2 font-light">你的内在</div>
                  <div className="text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 mb-2">
                    {dayMasterName}
                  </div>
                  <div className="text-slate-500 text-lg font-light">能量</div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="text-violet-600 text-sm font-light">今日能量色</div>
                  <div className="flex gap-4">
                    {luckyColors.slice(0, 3).map((color, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div
                          className="w-16 h-16 rounded-full border-2 border-white shadow-2xl"
                          style={{
                            backgroundColor: color.hex,
                            boxShadow: `0 8px 32px ${color.hex}30`
                          }}
                        ></div>
                        <span className="text-slate-600 text-xs font-light">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-violet-200/50 rounded-2xl p-4 max-w-xs shadow-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-slate-700 text-sm leading-relaxed font-light">
                      {fortuneQuote}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-slate-500 text-sm font-light">灵感方位</div>
                  <div
                    className="text-4xl font-light"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 8px rgba(139, 92, 246, 0.3))'
                    }}
                  >
                    {wealthDirection}
                  </div>
                </div>
              </div>

              <div className="mt-auto mb-6">
                <div className="bg-gradient-to-br from-violet-50/90 to-blue-50/90 backdrop-blur-xl border border-violet-300/50 rounded-2xl px-6 py-5 shadow-xl">
                  <p
                    className="text-slate-700 leading-relaxed text-center"
                    style={{
                      fontFamily: '"Noto Serif SC", "Source Han Serif SC", "STSong", serif',
                      fontSize: '15px',
                      lineHeight: '1.8',
                      fontWeight: '400'
                    }}
                  >
                    {elementalQuote}
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-white/80 backdrop-blur-xl border border-violet-200/50 rounded-2xl p-4 text-center shadow-lg">
                  <div className="text-slate-500 text-xs mb-2 font-light">分享你的能量</div>
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-100 to-blue-100 rounded-2xl flex items-center justify-center border border-violet-200/50">
                    <div className="text-slate-400 text-xs font-light">二维码</div>
                  </div>
                  <div className="text-slate-400 text-xs mt-2 font-light">扫码查看完整报告</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 hover:from-violet-600 hover:via-blue-600 hover:to-cyan-600 text-white font-light py-4 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-violet-300/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" strokeWidth={1.5} />
            <span>{isDownloading ? '生成中...' : '保存图片到相册'}</span>
          </button>

          <p className="text-slate-500 text-xs text-center font-light">
            如遇下载问题，可直接截屏保存
          </p>
        </div>
      </div>

      {/* Off-screen Render Container for html2canvas */}
      <div
        ref={offscreenRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          zIndex: -1
        }}
      >
        <ExportPoster
          dayMasterName={dayMasterName}
          luckyColors={luckyColors}
          elementalQuote={elementalQuote}
          wealthDirection={wealthDirection}
          fortuneQuote={fortuneQuote}
          currentCity={currentCity}
          today={today}
        />
      </div>
    </>
  );
}
