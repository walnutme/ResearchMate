import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Mail, Lock, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    // Add brief artificial delay for smooth experience
    setTimeout(() => {
      const res = login(email.trim(), password);
      setIsLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error || '이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    }, 600);
  };

  const handleDemoLogin = (demoEmail: string) => {
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      const res = login(demoEmail, 'password123');
      setIsLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError('데모 계정 로그인 중 오류가 발생했습니다.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Left side: Intro banner (desktop only, stacks on top for mobile) */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,theme(colors.indigo.800/30),transparent)]" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
        
        {/* Brand */}
        <div className="flex items-center gap-2.5 relative z-10 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-indigo-600 text-white p-2 rounded-xl flex items-center justify-center">
            <BookOpen className="size-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Research Mate</span>
        </div>

        {/* Catchphrase & Pitch */}
        <div className="my-12 md:my-0 space-y-6 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            벼락치기 없는 꾸준한 논문 집필 파트너
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2]">
            매일 소화할 수 있는<br />
            분량만큼만 쓰세요.
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            마감일 설정에 맞춰 데일리 플랜이 자동으로 생성되고, 집필 동기부여를 위한 보증금/포인트, 검증된 피어 리뷰 매칭까지 연구의 전 과정을 설계해 드립니다.
          </p>

          <div className="space-y-4 pt-4">
            {[
              '마감일을 맞추는 마일스톤 기반 데일리 미션 자동 관리',
              '집필 약속을 실천하기 위한 보증금 & 연속 수행 스트릭',
              '신뢰할 수 있는 학술 근거 중심 전공별 질문 커뮤니티',
              '학업 수준이 검증된 동료 매칭 피어 리뷰 루브릭 평가'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-xs md:text-sm text-slate-300">
                <span className="flex h-5 w-5 shrink-0 rounded-full bg-indigo-500/20 text-indigo-300 items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-slate-500 relative z-10">
          © 2026 Research Mate. All rights reserved.
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">로그인</h2>
            <p className="text-sm text-slate-500 font-medium">
              마감까지 매일 조금씩 완성하세요.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                이메일 주소
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-300 text-sm"
                />
                <Mail className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  비밀번호
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-300 text-sm"
                />
                <Lock className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 flex items-center justify-center gap-1.5 cursor-pointer text-sm"
            >
              {isLoading ? (
                <span className="animate-spin inline-block size-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  로그인하기
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-3 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              빠른 데모 로그인
            </span>
          </div>

          {/* Demo account shortcut buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('demo1@researchmate.app')}
              className="py-3 px-3 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between"
            >
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded inline-block mb-1">
                김철수 (학부연구생)
              </span>
              <span className="text-xs font-semibold text-slate-800 truncate">인문학 데모</span>
            </button>

            <button
              onClick={() => handleDemoLogin('demo2@researchmate.app')}
              className="py-3 px-3 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between"
            >
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded inline-block mb-1">
                이영희 (대학원생)
              </span>
              <span className="text-xs font-semibold text-slate-800 truncate">국제학 데모</span>
            </button>
          </div>

          {/* Signup link footer */}
          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">아직 회원이 아니신가요? </span>
            <Link to="/signup" className="text-xs font-bold text-indigo-600 hover:underline">
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
