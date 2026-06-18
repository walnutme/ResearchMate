import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  MoreHorizontal,
  Network, 
  PenTool, 
  Users, 
  ShieldCheck, 
  Trophy,
  X
} from 'lucide-react';

export default function ResponsiveNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const mainItems = [
    { path: '/dashboard', label: '대시보드', Icon: LayoutDashboard },
    { path: '/plan', label: '플랜', Icon: Calendar },
    { path: '/sources', label: '자료', Icon: BookOpen },
    { path: '/community', label: '커뮤니티', Icon: MessageSquare },
  ];

  const moreItems = [
    { path: '/arguments', label: '주장 & 근거 빌더', Icon: Network },
    { path: '/draft', label: '초안 집필', Icon: PenTool },
    { path: '/peer-review', label: '피어 리뷰', Icon: Users },
    { path: '/final-check', label: 'AI 최종 점검', Icon: ShieldCheck },
    { path: '/profile', label: '리워드 및 프로필', Icon: Trophy },
  ];

  const handleNavigate = (path: string) => {
    setShowMore(false);
    navigate(path);
  };

  return (
    <>
      {/* Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 h-16 flex items-center justify-around px-2 z-50 shadow-lg">
        {mainItems.map(item => {
          const isActive = location.pathname === item.path && !showMore;
          return (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-1 text-slate-500 cursor-pointer"
            >
              <item.Icon className={`size-5 transition-all ${isActive ? 'text-indigo-600 scale-110' : 'text-slate-400'}`} />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setShowMore(prev => !prev)}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1 text-slate-500 cursor-pointer"
        >
          {showMore ? (
            <X className="size-5 text-indigo-600 scale-110" />
          ) : (
            <MoreHorizontal className="size-5 text-slate-400" />
          )}
          <span className={`text-[10px] font-medium ${showMore ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
            더보기
          </span>
        </button>
      </nav>

      {/* Bottom Sheet Menu for More Items */}
      {showMore && (
        <div className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity" onClick={() => setShowMore(false)}>
          <div 
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl p-6 space-y-4 border-t border-slate-100 shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 text-sm">전체 기능 메뉴</h3>
              <button onClick={() => setShowMore(false)} className="text-slate-400 hover:text-slate-600">
                <X className="size-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {moreItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 font-bold'
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/50 text-slate-600 font-medium'
                    }`}
                  >
                    <item.Icon className={`size-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
