import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAppState } from '../../context/AppStateContext';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Network, 
  PenTool, 
  MessageSquare, 
  Users, 
  ShieldCheck, 
  Trophy, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, resetApp } = useAppState();

  const navItems = [
    { path: '/dashboard', label: '대시보드', Icon: LayoutDashboard },
    { path: '/plan', label: '데일리 플랜', Icon: Calendar },
    { path: '/sources', label: '자료 및 출처', Icon: BookOpen },
    { path: '/arguments', label: '주장 & 근거 빌더', Icon: Network },
    { path: '/draft', label: '초안 집필', Icon: PenTool },
    { path: '/community', label: '연구 커뮤니티', Icon: MessageSquare },
    { path: '/peer-review', label: '피어 리뷰', Icon: Users },
    { path: '/final-check', label: 'AI 최종 점검', Icon: ShieldCheck },
    { path: '/profile', label: '리워드 및 프로필', Icon: Trophy },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Logo */}
      <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-800 shrink-0">
        <div className="bg-indigo-600 text-white p-1.5 rounded-lg flex items-center justify-center">
          <BookOpen className="size-5" />
        </div>
        <span className="font-bold text-lg text-white tracking-tight">Research Mate</span>
      </div>

      {/* Profile Summary */}
      {state.user && (
        <div className="p-4 mx-4 my-4 bg-slate-800/50 rounded-xl border border-slate-800 flex items-center gap-3 shrink-0">
          <div className="size-10 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center shrink-0">
            {state.user.name[0]}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-white truncate">{state.user.name}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
              {state.user.level === 'undergrad' ? '학부생' : state.user.level === 'undergrad_researcher' ? '학부 연구생' : '대학원생'}
            </p>
          </div>
        </div>
      )}

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'hover:bg-slate-800/60 hover:text-white text-slate-400'
              }`}
            >
              <item.Icon className={`size-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Streak</span>
          <span className="text-orange-400 font-bold flex items-center gap-0.5">
            🔥 {state.streak}일 연속
          </span>
        </div>
        <button
          onClick={resetApp}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          과제 초기화
        </button>
      </div>
    </aside>
  );
}
