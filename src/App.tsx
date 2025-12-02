import { useState, useEffect } from 'react';
import { UserForm } from './components/UserForm';
import { FortuneDisplay } from './components/FortuneDisplay';
import { getUserProfile, saveUserProfile, clearUserProfile } from './utils/storage';
import { calculateLifeStar, calculateDailyFlyingStar, getNinePalaceGrid } from './utils/flyingStars';
import { analyzeElementInteraction } from './utils/fiveElements';
import { generateOutfitRecommendation } from './utils/outfitRecommendation';
import { calculateLuckyDirection } from './utils/luckyDirection';
import { calculateWealthDirection } from './utils/wealthDirection';
import { calculateTrueSolarTime } from './utils/solarTime';
import { calculateBaZi, getDayMasterName, getDayMasterDescription, formatBaZi } from './utils/bazi';
import { analyzeBaziStrength } from './utils/baziStrength';
import type { UserProfile } from './utils/storage';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const profile = getUserProfile();
      setUserProfile(profile);
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUserSubmit = (profile: UserProfile) => {
    try {
      saveUserProfile(profile);
      setUserProfile(profile);
      setError(null);
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to save profile'));
    }
  };

  const handleReset = () => {
    try {
      clearUserProfile();
      setUserProfile(null);
      setError(null);
    } catch (err) {
      console.error('Failed to reset:', err);
    }
  };

  const handleErrorReset = () => {
    clearUserProfile();
    setUserProfile(null);
    setError(null);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-pulse text-blue-400 text-xl">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-light text-slate-800 mb-2">数据解析异常</h2>
          <p className="text-slate-600 mb-6 text-sm">
            应用遇到了一个错误，可能是数据格式不兼容导致的。
          </p>
          <button
            onClick={handleErrorReset}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-light py-3 px-6 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
          >
            清除数据并重置
          </button>
          <p className="text-slate-400 text-xs mt-4">
            此操作将清除所有本地数据并刷新页面
          </p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return <UserForm onSubmit={handleUserSubmit} />;
  }

  try {
    const birthDate = new Date(userProfile.birthDate);
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth() + 1;
    const isMale = userProfile.gender === 'male';

    const birthCity = userProfile.birthCity || '北京';
    const currentCity = userProfile.currentCity || '本地';

    const trueSolarDateTime = calculateTrueSolarTime(birthDate, userProfile.birthTime, birthCity);
    const bazi = calculateBaZi(trueSolarDateTime);
    const dayMasterName = getDayMasterName(bazi.dayMaster);
    const dayMasterDescription = getDayMasterDescription(bazi.dayMaster);
    const baziString = formatBaZi(bazi);
    const baziAnalysis = analyzeBaziStrength(bazi, birthMonth);

    const trueSolarTimeString = `${trueSolarDateTime.getHours().toString().padStart(2, '0')}:${trueSolarDateTime.getMinutes().toString().padStart(2, '0')}`;

    const userStar = calculateLifeStar(birthYear, isMale);
    const dailyStar = calculateDailyFlyingStar(new Date());
    const grid = getNinePalaceGrid(dailyStar.number);
    const interaction = analyzeElementInteraction(dailyStar.element, userStar.element);
    const outfit = generateOutfitRecommendation(dailyStar.element, bazi.dayMasterElement, interaction.relation, birthMonth, baziAnalysis);
    const luckyDirection = calculateLuckyDirection(grid, currentCity);
    const wealthDirection = calculateWealthDirection(grid, currentCity);

    return (
      <FortuneDisplay
        userStar={userStar}
        dailyStar={dailyStar}
        grid={grid}
        interaction={interaction}
        outfit={outfit}
        luckyDirection={luckyDirection}
        wealthDirection={wealthDirection}
        bazi={bazi}
        baziString={baziString}
        baziAnalysis={baziAnalysis}
        dayMasterName={dayMasterName}
        dayMasterDescription={dayMasterDescription}
        birthCity={birthCity}
        currentCity={currentCity}
        clockTime={userProfile.birthTime}
        trueSolarTime={trueSolarTimeString}
        onReset={handleReset}
      />
    );
  } catch (err) {
    console.error('Error rendering fortune display:', err);
    setError(err instanceof Error ? err : new Error('Rendering error'));
    return null;
  }
}

export default App;
