import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Award, Users, CheckCircle, ArrowRight, ShieldAlert, Zap } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner / Navbar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg flex items-center justify-center">
              <BookOpen className="size-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Research Mate</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')} 
              className="text-slate-600 hover:text-indigo-600 font-semibold text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              로그인
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-all shadow-sm shadow-indigo-100 hover:shadow-indigo-200 flex items-center gap-1 cursor-pointer"
            >
              회원가입
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),theme(colors.slate.50/0))]" />
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            마감 직전 벼락치기 방지 연구 파트너
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
            논문·레포트·연구보고서를<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">매일 조금씩 마감일 내에</span> 완성하기
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            Research Mate는 지연되는 연구 작성 과제를 매일 소화 가능한 미션으로 배분하고, 포인트와 보증금 시스템, 그리고 신뢰도 높은 피어 리뷰로 완성도를 끝까지 이끌어 줍니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/signup')} 
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              무료로 시작하기
              <ArrowRight className="size-5" />
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-8 py-4 rounded-xl border border-slate-200 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              데모 계정 로그인
            </button>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-400 mb-8">연구 글쓰기 과정의 흔한 한계와 문제점</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl flex gap-4 border border-slate-100">
              <div className="bg-red-50 text-red-500 p-3 rounded-xl size-12 flex items-center justify-center shrink-0">
                <ShieldAlert className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">벼락치기로 무너지는 논리 구조</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  마감일 직전에 수많은 참고 문헌을 찾고 글을 쓰려다 보니 체계적인 아규먼트 구조가 무너지고, 결국 깊이 없는 결론과 오탈자 가득한 결과물을 제출하게 됩니다.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl flex gap-4 border border-slate-100">
              <div className="bg-amber-50 text-amber-500 p-3 rounded-xl size-12 flex items-center justify-center shrink-0">
                <Users className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">신뢰하기 힘든 온라인 답변과 피드백</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  동료들에게 피드백을 요청하거나 질문 게시판에 올려도, 구체적인 근거가 없거나 가벼운 감상 평에 그쳐 학술 논문을 개선하는 데 큰 도움을 얻지 못합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">단순한 Todo 리스트가 아닙니다</h2>
            <p className="text-slate-600">자료 수집부터 논리 구조 검증, 피어 리뷰와 표절률 1차 체크까지 학술적 글쓰기의 모든 주기를 관리합니다.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all hover:-translate-y-1 shadow-sm">
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl size-12 flex items-center justify-center mb-6">
                <BookOpen className="size-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">마감일 기반 데일리 미션</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                마감일, 목표 분량, 잔여 기간을 연동해 매일 읽어야 할 논문 수와 채워야 할 분량을 설계된 학습 단계에 맞춰 자동 분배합니다.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all hover:-translate-y-1 shadow-sm">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl size-12 flex items-center justify-center mb-6">
                <Award className="size-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">보증금/포인트 동기부여</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                미션 미루기 시 보증금이 벌금으로 소폭 차감되고, 성공 시 포인트와 streak이 올라갑니다. 벌금은 일정 재조정 페널티 역할을 합니다.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all hover:-translate-y-1 shadow-sm">
              <div className="bg-violet-50 text-violet-600 p-3 rounded-xl size-12 flex items-center justify-center mb-6">
                <Users className="size-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">분야별 질문 커뮤니티</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                학술적 논의를 전공별로 분류하고 답변자에게 포인트를 리워드로 거는 구조로 작동하여, 확실한 통계 및 이론적 근거 기반의 답변을 유도합니다.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all hover:-translate-y-1 shadow-sm">
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl size-12 flex items-center justify-center mb-6">
                <CheckCircle className="size-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Peer Review & AI 최종 점검</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                전공 학업 수준이 매칭된 피어 그룹의 체계적인 루브릭 평가와, 논증 흐름/인용 규격/표절 위험을 사전에 짚어내는 AI 검사 툴을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-20 bg-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,theme(colors.indigo.800),transparent)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-indigo-200 font-medium text-sm uppercase tracking-widest mb-4">Research Mate의 철학</p>
          <blockquote className="text-2xl sm:text-3xl font-light italic leading-relaxed mb-8">
            "뛰어난 연구 성과는 마감 전날 밤이 아니라, 매일 조금씩 쌓아 올린 글쓰기 습관과 신뢰도 높은 피드백에서 탄생합니다."
          </blockquote>
          <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full mb-10" />
          <button 
            onClick={() => navigate('/signup')} 
            className="bg-white hover:bg-slate-50 text-indigo-950 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            지금 무료로 등록하기
            <ArrowRight className="size-5 text-indigo-600" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 text-indigo-400 p-1.5 rounded-md flex items-center justify-center">
              <BookOpen className="size-4" />
            </div>
            <span className="font-bold text-slate-300">Research Mate</span>
          </div>
          <p className="text-xs">© 2026 Research Mate. All rights reserved. 본 서비스는 프로토타입 용도로 제작되었습니다.</p>
        </div>
      </footer>
    </div>
  );
}
