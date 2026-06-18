import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import { BookOpen, User as UserIcon, Mail, Lock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [level, setLevel] = useState<User['level']>('undergrad');
  const [major, setMajor] = useState('사회과학');
  const [language, setLanguage] = useState<User['language']>('ko');

  // UI status
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Input validations
    if (!name.trim()) return setError('이름을 입력해 주세요.');
    if (!email.trim()) return setError('이메일을 입력해 주세요.');
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return setError('올바른 이메일 형식이 아닙니다.');
    }

    if (!password) return setError('비밀번호를 입력해 주세요.');
    if (password.length < 4) {
      return setError('비밀번호는 최소 4자 이상 입력해 주세요.');
    }
    if (password !== passwordConfirm) {
      return setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    setIsLoading(true);
    
    // Artificial delay for smooth UX loading micro-animations
    setTimeout(() => {
      const res = signup({
        name: name.trim(),
        email: email.trim(),
        password,
        level,
        major,
        language
      });
      setIsLoading(false);

      if (res.success) {
        navigate('/setup');
      } else {
        setError(res.error || '회원가입 처리 중 오류가 발생했습니다.');
      }
    }, 600);
  };

  const majors = ['인문학', '사회과학', '국제학', '자연과학', '공학', '예술/디자인', '기타'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Left side: Intro banner */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,theme(colors.indigo.800/30),transparent)]" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
        
        {/* Brand logo */}
        <div className="flex items-center gap-2.5 relative z-10 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-indigo-600 text-white p-2 rounded-xl flex items-center justify-center">
            <BookOpen className="size-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Research Mate</span>
        </div>

        {/* Content pitching the onboarding */}
        <div className="my-12 md:my-0 space-y-6 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold">
            <CheckCircle2 className="size-3.5" />
            나만의 학술 글쓰기 주치의 서비스
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2]">
            나만을 위한 연구<br />
            매니저를 고용하세요.
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            회원가입 후 연구 과제 정보(유형, 주제, 마감일)만 등록하면, 매일 써야 할 최적 분량의 액션 플랜을 즉각 수립해 드립니다.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 rounded-lg bg-indigo-500/10 text-indigo-400 items-center justify-center font-bold text-xs mt-0.5">
                1
              </span>
              <div>
                <h4 className="font-bold text-sm text-white">학업 수준별 매칭</h4>
                <p className="text-xs text-slate-400 mt-0.5">학부생, 학부연구생, 대학원생에 적합한 피어 리뷰어 그룹이 자동 제안됩니다.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="flex h-5.5 w-5.5 shrink-0 rounded-lg bg-indigo-500/10 text-indigo-400 items-center justify-center font-bold text-xs mt-0.5">
                2
              </span>
              <div>
                <h4 className="font-bold text-sm text-white">전공 분야별 커뮤니티</h4>
                <p className="text-xs text-slate-400 mt-0.5">인문학부터 공학까지, 내 전공 분야의 연구 고민을 포인트를 걸고 공유하세요.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 relative z-10">
          © 2026 Research Mate. All rights reserved.
        </div>
      </div>

      {/* Right side: Register form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 bg-slate-50">
        <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">회원가입</h2>
            <p className="text-sm text-slate-500 font-medium">
              나에게 맞는 연구 플랜을 만들기 위한 기본 정보
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  연구자 이름
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-300 text-sm"
                  />
                  <UserIcon className="absolute left-3.5 top-3 size-4 text-slate-400" />
                </div>
              </div>

              {/* Email */}
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
                    placeholder="email@address.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-300 text-sm"
                  />
                  <Mail className="absolute left-3.5 top-3 size-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-300 text-sm"
                  />
                  <Lock className="absolute left-3.5 top-3 size-4 text-slate-400" />
                </div>
              </div>

              {/* Password Confirm */}
              <div>
                <label htmlFor="passwordConfirm" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <input
                    id="passwordConfirm"
                    type="password"
                    required
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all placeholder:text-slate-300 text-sm"
                  />
                  <Lock className="absolute left-3.5 top-3 size-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Academic Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                학업 수준
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'undergrad', label: '학부생' },
                  { id: 'undergrad_researcher', label: '학부 연구생' },
                  { id: 'grad', label: '대학원생' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLevel(item.id as User['level'])}
                    className={`py-2 px-3 border rounded-xl font-semibold text-xs text-center transition-all cursor-pointer ${
                      level === item.id
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Major */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                전공/연구 분야
              </label>
              <div className="flex flex-wrap gap-1.5">
                {majors.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMajor(m)}
                    className={`py-1.5 px-3 border rounded-full font-semibold text-[11px] transition-all cursor-pointer ${
                      major === m
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Language */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                주 작성 언어
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ko', label: '한국어' },
                  { id: 'en', label: '영어' },
                  { id: 'both', label: '한국어+영어' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLanguage(item.id as User['language'])}
                    className={`py-2 px-3 border rounded-xl font-semibold text-xs text-center transition-all cursor-pointer ${
                      language === item.id
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 flex items-center justify-center gap-1.5 cursor-pointer text-sm pt-3"
            >
              {isLoading ? (
                <span className="animate-spin inline-block size-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  가입 및 과제 설정 시작하기
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          {/* Login link footer */}
          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">이미 계정이 있으신가요? </span>
            <Link to="/login" className="text-xs font-bold text-indigo-600 hover:underline">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
