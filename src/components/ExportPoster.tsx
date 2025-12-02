import { Compass } from 'lucide-react';

interface ExportPosterProps {
  dayMasterName: string;
  luckyColors: Array<{ name: string; hex: string }>;
  elementalQuote: string;
  wealthDirection: string;
  fortuneQuote: string;
  currentCity: string;
  today: string;
}

export function ExportPoster({
  luckyColors,
  fortuneQuote,
  currentCity,
  today
}: ExportPosterProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const formatCity = (city: string) => {
    const cityMap: Record<string, string> = {
      '北京': 'Beijing',
      '上海': 'Shanghai',
      '广州': 'Guangzhou',
      '深圳': 'Shenzhen',
      '杭州': 'Hangzhou',
      '成都': 'Chengdu',
      '重庆': 'Chongqing',
      '南京': 'Nanjing',
      '武汉': 'Wuhan',
      '西安': 'Xi\'an',
      '天津': 'Tianjin',
      '苏州': 'Suzhou'
    };
    return cityMap[city] || city;
  };

  const primaryColor = luckyColors[0];
  const secondaryColors = luckyColors.slice(1, 3);

  return (
    <div
      style={{
        width: '450px',
        height: '800px',
        backgroundColor: '#ffffff',
        padding: '40px',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Minimal Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '60px'
      }}>
        <div style={{
          fontSize: '11px',
          color: '#9ca3af',
          fontWeight: '300',
          letterSpacing: '0.5px'
        }}>
          {formatDate(today)}
        </div>
        <div style={{
          fontSize: '11px',
          color: '#9ca3af',
          fontWeight: '300',
          letterSpacing: '0.5px'
        }}>
          {formatCity(currentCity)}
        </div>
      </div>

      {/* Color Blocks - Pantone Card Style */}
      <div style={{
        flex: '0 0 auto',
        marginBottom: '60px'
      }}>
        {/* Primary Color Block */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              width: '100%',
              height: '280px',
              backgroundColor: primaryColor.hex,
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              marginBottom: '12px'
            }}
          ></div>
          <div style={{
            fontSize: '11px',
            color: '#6b7280',
            fontWeight: '400',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {primaryColor.name}
          </div>
        </div>

        {/* Secondary Colors */}
        {secondaryColors.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: secondaryColors.length === 1 ? '1fr' : '1fr 1fr',
            gap: '12px'
          }}>
            {secondaryColors.map((color, index) => (
              <div key={index}>
                <div
                  style={{
                    width: '100%',
                    height: '80px',
                    backgroundColor: color.hex,
                    borderRadius: '8px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    marginBottom: '8px'
                  }}
                ></div>
                <div style={{
                  fontSize: '10px',
                  color: '#9ca3af',
                  fontWeight: '400',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  {color.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fortune Quote - Serif Typography */}
      <div style={{
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '40px'
      }}>
        <div style={{
          fontFamily: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", serif',
          fontSize: '18px',
          lineHeight: '2',
          color: '#1f2937',
          textAlign: 'center',
          maxWidth: '340px',
          letterSpacing: '0.5px'
        }}>
          {fortuneQuote}
        </div>
      </div>

      {/* Footer - Brand + QR Placeholder */}
      <div style={{
        borderTop: '1px solid #f3f4f6',
        paddingTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          </div>
          <div style={{
            fontSize: '13px',
            color: '#6b7280',
            fontWeight: '300',
            letterSpacing: '0.5px'
          }}>
            气场局 Qi Lab
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{
            fontSize: '9px',
            color: '#d1d5db',
            textAlign: 'center',
            lineHeight: '1.3'
          }}>
            QR
          </div>
        </div>
      </div>
    </div>
  );
}
