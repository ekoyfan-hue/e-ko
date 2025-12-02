import { useState, useEffect, useRef } from 'react';
import { Compass, MapPin } from 'lucide-react';

interface UserFormProps {
  onSubmit: (data: {
    birthDate: string;
    birthTime: string;
    gender: 'male' | 'female';
    birthCity: string;
    currentCity: string;
  }) => void;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthCity, setBirthCity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    if (year && month && day) {
      const paddedMonth = month.padStart(2, '0');
      const paddedDay = day.padStart(2, '0');
      setBirthDate(`${year}-${paddedMonth}-${paddedDay}`);
    }
  }, [year, month, day]);

  useEffect(() => {
    if (hour && minute) {
      const paddedHour = hour.padStart(2, '0');
      const paddedMinute = minute.padStart(2, '0');
      setBirthTime(`${paddedHour}:${paddedMinute}`);
    }
  }, [hour, minute]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(value);
    if (value.length === 4) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    const numValue = parseInt(value);
    if (value && (numValue < 1 || numValue > 12)) return;
    setMonth(value);
    if (value.length === 2) {
      dayRef.current?.focus();
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    const numValue = parseInt(value);
    if (value && (numValue < 1 || numValue > 31)) return;
    setDay(value);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    const numValue = parseInt(value);
    if (value && numValue > 23) return;
    setHour(value);
    if (value.length === 2) {
      minuteRef.current?.focus();
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    const numValue = parseInt(value);
    if (value && numValue > 59) return;
    setMinute(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate && birthTime && birthCity && currentCity && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit({ birthDate, birthTime, gender, birthCity, currentCity });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Soft Gradient Orbs - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-violet-300/30 to-cyan-300/30 rounded-full blur-3xl"></div>
      <div className="hidden md:block absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"></div>

      {/* Mobile: Full screen | Desktop: Centered card */}
      <div className="md:flex md:items-center md:justify-center md:min-h-screen md:p-6">
        <div className="relative w-full md:max-w-md">
          {/* Form Container */}
          <div className="relative bg-white/70 backdrop-blur-2xl border-white/60 md:border md:rounded-3xl md:shadow-2xl md:shadow-purple-200/50 min-h-screen md:min-h-0 pb-32 md:pb-0">
            {/* Content with padding */}
            <div className="px-6 pt-12 pb-6 md:p-10">
              {/* Icon */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-cyan-400/20 blur-2xl rounded-full"></div>
                  <Compass className="relative w-14 h-14 text-violet-500 animate-spin" style={{ animationDuration: '30s' }} strokeWidth={1} />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-light text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 mb-2 tracking-wide">
                气场局 Qi Lab
              </h1>
              <p className="text-center text-slate-500 text-sm mb-12 font-light">
                找回内在平衡的空间
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Birth Date - Equal Width Grid */}
                <div>
                  <label className="block text-slate-600 text-sm mb-4 font-light">
                    出生日期 <span className="text-violet-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      ref={yearRef}
                      type="text"
                      inputMode="numeric"
                      value={year}
                      onChange={handleYearChange}
                      placeholder="年"
                      className="bg-white/60 border border-violet-200/60 rounded-2xl px-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50 transition-all text-center font-light text-base h-12"
                      required
                    />
                    <input
                      ref={monthRef}
                      type="text"
                      inputMode="numeric"
                      value={month}
                      onChange={handleMonthChange}
                      placeholder="月"
                      className="bg-white/60 border border-violet-200/60 rounded-2xl px-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50 transition-all text-center font-light text-base h-12"
                      required
                    />
                    <input
                      ref={dayRef}
                      type="text"
                      inputMode="numeric"
                      value={day}
                      onChange={handleDayChange}
                      placeholder="日"
                      className="bg-white/60 border border-violet-200/60 rounded-2xl px-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50 transition-all text-center font-light text-base h-12"
                      required
                    />
                  </div>
                </div>

                {/* Birth Time - Equal Width Grid */}
                <div>
                  <label className="block text-slate-600 text-sm mb-4 font-light">
                    出生时间 <span className="text-violet-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      ref={hourRef}
                      type="text"
                      inputMode="numeric"
                      value={hour}
                      onChange={handleHourChange}
                      placeholder="时"
                      className="bg-white/60 border border-violet-200/60 rounded-2xl px-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50 transition-all text-center font-light text-base h-12"
                      required
                    />
                    <input
                      ref={minuteRef}
                      type="text"
                      inputMode="numeric"
                      value={minute}
                      onChange={handleMinuteChange}
                      placeholder="分"
                      className="bg-white/60 border border-violet-200/60 rounded-2xl px-4 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50 transition-all text-center font-light text-base h-12"
                      required
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-3 leading-relaxed font-light">
                    *我们会根据你的出生地自动校准真实时间能量
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-slate-600 text-sm mb-4 font-light">
                    性别 <span className="text-violet-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`flex-1 py-4 rounded-2xl transition-all font-light text-base ${
                        gender === 'male'
                          ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-300/50'
                          : 'bg-white/60 text-slate-600 border border-violet-200/60 hover:border-violet-300'
                      }`}
                    >
                      男
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`flex-1 py-4 rounded-2xl transition-all font-light text-base ${
                        gender === 'female'
                          ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-300/50'
                          : 'bg-white/60 text-slate-600 border border-violet-200/60 hover:border-violet-300'
                      }`}
                    >
                      女
                    </button>
                  </div>
                </div>

                {/* Birth City */}
                <div>
                  <label className="block text-slate-600 text-sm mb-4 font-light">
                    出生城市 <span className="text-violet-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" strokeWidth={1.5} />
                    <input
                      type="text"
                      value={birthCity}
                      onChange={(e) => setBirthCity(e.target.value)}
                      placeholder="例如：北京"
                      className="w-full pl-12 pr-5 py-4 bg-white/60 border border-violet-200/60 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50 transition-all font-light text-base"
                      required
                    />
                  </div>
                </div>

                {/* Current City */}
                <div>
                  <label className="block text-slate-600 text-sm mb-4 font-light">
                    当前城市 <span className="text-violet-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" strokeWidth={1.5} />
                    <input
                      type="text"
                      value={currentCity}
                      onChange={(e) => setCurrentCity(e.target.value)}
                      placeholder="例如：上海"
                      className="w-full pl-12 pr-5 py-4 bg-white/60 border border-violet-200/60 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200/50 transition-all font-light text-base"
                      required
                    />
                  </div>
                </div>

                {/* Desktop Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hidden md:block w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 hover:from-violet-600 hover:via-blue-600 hover:to-cyan-600 text-white py-4 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-300/50 disabled:opacity-50 disabled:cursor-not-allowed font-light text-lg"
                >
                  {isSubmitting ? '感知中...' : '感知今日磁场'}
                </button>
              </form>
            </div>

            {/* Mobile Sticky Bottom Button */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
              {/* Gradient fade overlay */}
              <div className="h-20 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none"></div>
              <div className="bg-white px-6 pb-6 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 active:from-violet-600 active:via-blue-600 active:to-cyan-600 text-white py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-violet-300/50 disabled:opacity-50 disabled:cursor-not-allowed font-light text-lg"
                >
                  {isSubmitting ? '感知中...' : '启动能量监测'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
