import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { differenceInDays, parseISO } from 'date-fns';
import { Wallet, Trophy, Flame, Calendar, BookOpen, LogOut } from 'lucide-react';

export default function Header() {
  const { state } = useAppState();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDDay = () => {
    if (!state.project) return 'D-0';
    const today = new Date();
    // Normalize date to prevent hour-difference mismatch
    today.setHours(0, 0, 0, 0);
    const deadlineDate = parseISO(state.project.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const diff = differenceInDays(deadlineDate, today);
    if (diff === 0) return 'D-Day';
    if (diff > 0) return `D-${diff}`;
    return `D+${Math.abs(diff)}`;
  };

  const getProgressPercentage = () => {
    if (!state.missions.length) return 0;
    const completed = state.missions.filter(m => m.status === 'completed').length;
    return Math.round((completed / state.missions.length) * 100);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40 select-none">
      {/* Project info */}
      <div className="flex items-center gap-3 overflow-hidden">
        {state.project ? (
          <>
            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold px-2.5 py-1 rounded-full shrink-0">
              {getDDay()}
            </span>
            <h1 className="font-bold text-slate-800 text-sm md:text-base truncate max-w-[200px] sm:max-w-[320px] md:max-w-[400px]">
              {state.project.topic}
            </h1>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-indigo-600" />
            <h1 className="font-bold text-slate-800 text-sm">새로운 연구 등록</h1>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        {/* Streak */}
        <div className="flex items-center gap-1.5" title="연속 완료 streak">
          <Flame className="size-4 text-orange-500 fill-orange-500" />
          <span className="text-sm font-bold text-slate-700">{state.streak}일</span>
        </div>

        {/* Deposit */}
        <div className="flex items-center gap-1.5" title="남은 보증금">
          <Wallet className="size-4 text-emerald-500" />
          <span className="text-sm font-bold text-slate-700">
            {state.deposit.toLocaleString()}원
          </span>
        </div>

        {/* Points */}
        <div className="flex items-center gap-1.5" title="적립된 포인트">
          <Trophy className="size-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-slate-700">
            {state.points.toLocaleString()} P
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
          title="로그아웃"
        >
          <LogOut className="size-4.5" />
        </button>
      </div>
    </header>
  );
}
