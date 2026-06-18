import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { useAuth } from '../context/AuthContext';
import { getUserData } from '../lib/userData';
import {
  collectWrittenContent,
  generateContentHash,
  checkEligibility,
  runFinalCheck,
  MIN_CHARACTERS,
  MIN_CHARACTERS_FOR_CHAR_UNIT,
} from '../lib/finalCheckLogic';
import { FinalCheckResult } from '../types';
import {
  ShieldCheck, Play, CheckCircle, AlertTriangle, Info,
  FileText, ArrowRight, RefreshCw, Clock, BookOpen,
  AlignLeft, Link2, TrendingUp, XCircle, AlertCircle
} from 'lucide-react';

// ─── 상태 뱃지 ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: 'good' | 'needsWork' | 'insufficient' }) {
  if (status === 'good') return (
    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">양호</span>
  );
  if (status === 'needsWork') return (
    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">개선 필요</span>
  );
  return (
    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">부족</span>
  );
}

function SimilarityBadge({ status }: { status: 'notChecked' | 'low' | 'needsReview' }) {
  if (status === 'low') return (
    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">낮음</span>
  );
  if (status === 'needsReview') return (
    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">확인 필요</span>
  );
  return (
    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">미점검</span>
  );
}

// ─── 점수 원형 게이지 ─────────────────────────────────────────────────────
function ReadinessGauge({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <circle
          cx="44" cy="44" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="44" y="49" textAnchor="middle" fontSize="18" fontWeight="800" fill={color}>{score}</text>
      </svg>
      <p className="text-xs font-bold text-slate-500">제출 준비도</p>
    </div>
  );
}

// ─── 메인 컴포넌트 ───────────────────────────────────────────────────────────
export default function FinalCheck() {
  const navigate = useNavigate();
  const { state, saveFinalCheck } = useAppState();
  const { currentUser } = useAuth();

  const [auditState, setAuditState] = useState<'idle' | 'ready' | 'checking' | 'result'>('idle');
  const [savedResult, setSavedResult] = useState<FinalCheckResult | null>(null);
  const [isStale, setIsStale] = useState(false);
  const [progress, setProgress] = useState(0);

  // 현재 작성 내용 수집
  const content = collectWrittenContent(
    state.draft,
    state.missions,
    state.sources,
    state.claims
  );
  const eligibility = checkEligibility(content, state.project?.targetUnit);
  const currentHash = generateContentHash(content);

  // 저장된 finalCheck 불러오기 + stale 판단
  useEffect(() => {
    if (!currentUser || !state.project?.id) {
      setSavedResult(null);
      setAuditState('idle');
      return;
    }
    const userData = getUserData(currentUser.id);
    if (!userData) return;
    const saved = userData.finalChecksByProject?.[state.project.id];
    if (saved) {
      setSavedResult(saved);
      const stale = saved.contentHash !== currentHash;
      setIsStale(stale);
      setAuditState('result');
    } else if (eligibility.eligible) {
      setAuditState('ready');
    } else {
      setAuditState('idle');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id, state.project?.id]);

  // 작성 내용이 바뀌면 stale 업데이트
  useEffect(() => {
    if (savedResult && savedResult.contentHash !== currentHash) {
      setIsStale(true);
    }
  }, [currentHash, savedResult]);

  const handleRunCheck = useCallback(() => {
    if (!eligibility.eligible) return;
    setAuditState('checking');
    setProgress(0);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
      const result = runFinalCheck(content);
      saveFinalCheck(result);
      setSavedResult(result);
      setIsStale(false);
      setAuditState('result');
    }, 1400);
  }, [content, eligibility.eligible, saveFinalCheck]);

  // ── 가드: 로그인/프로젝트 없음 ─────────────────────────────────────────
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="size-14 rounded-full bg-slate-100 flex items-center justify-center">
          <ShieldCheck className="size-7 text-slate-400" />
        </div>
        <h3 className="font-bold text-slate-700">로그인이 필요합니다</h3>
        <p className="text-sm text-slate-500">AI 최종 점검을 사용하려면 먼저 로그인해주세요.</p>
      </div>
    );
  }

  if (!state.project) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="size-14 rounded-full bg-indigo-50 flex items-center justify-center">
          <FileText className="size-7 text-indigo-400" />
        </div>
        <h3 className="font-bold text-slate-700">먼저 과제를 만들어주세요</h3>
        <p className="text-sm text-slate-500 max-w-xs">과제를 등록하면 AI 최종 점검 기능을 사용할 수 있습니다.</p>
        <button
          onClick={() => navigate('/project-setup')}
          className="mt-2 bg-indigo-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          과제 등록하기
        </button>
      </div>
    );
  }

  // ── 섹션 카드 렌더러 ─────────────────────────────────────────────────────
  const renderResultCard = (result: FinalCheckResult) => (
    <div className="space-y-5">
      {/* stale 배너 */}
      {isStale && (
        <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
          <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 flex-1">
            <span className="font-bold">작성 내용이 변경되어 다시 점검이 필요합니다.</span>
            <span className="ml-1 text-amber-600">아래 결과는 이전 점검 기준입니다.</span>
          </div>
          <button
            onClick={handleRunCheck}
            className="shrink-0 text-[11px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg transition-colors"
          >
            다시 점검
          </button>
        </div>
      )}

      {/* 요약 헤더 */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-slate-50 rounded-2xl p-4">
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-xl font-extrabold text-slate-800">{result.totalCharacters.toLocaleString()}</p>
            <p className="text-[11px] text-slate-500">총 작성 글자수</p>
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800">{result.sectionsCompleted}/3</p>
            <p className="text-[11px] text-slate-500">작성 섹션</p>
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800">{result.sourceCount}</p>
            <p className="text-[11px] text-slate-500">등록 출처</p>
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800">{result.citationCompleteness}%</p>
            <p className="text-[11px] text-slate-500">인용 완성도</p>
          </div>
        </div>
        {result.readinessScore !== null
          ? <ReadinessGauge score={result.readinessScore} />
          : (
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="size-[88px] rounded-full border-8 border-slate-200 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-400">-</span>
              </div>
              <p className="text-xs text-slate-400">준비도 미산출</p>
            </div>
          )
        }
      </div>

      {/* 1. 논리 흐름 */}
      <div className="p-4 border border-slate-100 rounded-2xl space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-indigo-500 shrink-0" />
          <h4 className="font-bold text-slate-800 text-sm flex-1">논리 흐름</h4>
          <StatusBadge status={result.logicFlow.status} />
          <span className="text-xs font-bold text-slate-400">{result.logicFlow.score}점</span>
        </div>
        <ul className="space-y-1">
          {result.logicFlow.feedback.map((f, i) => (
            <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-1.5">
              <span className="text-slate-300 shrink-0">•</span>{f}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. 인용/출처 */}
      <div className="p-4 border border-slate-100 rounded-2xl space-y-2">
        <div className="flex items-center gap-2">
          <Link2 className="size-4 text-indigo-500 shrink-0" />
          <h4 className="font-bold text-slate-800 text-sm flex-1">인용 &amp; 출처</h4>
          <StatusBadge status={result.citationCheck.status} />
        </div>
        <ul className="space-y-1">
          {result.citationCheck.feedback.map((f, i) => (
            <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-1.5">
              <span className="text-slate-300 shrink-0">•</span>{f}
            </li>
          ))}
        </ul>
        {result.citationCheck.missingSources.length > 0 && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 space-y-1 mt-1">
            <p className="text-[11px] font-bold text-rose-600">DOI/URL 누락 출처</p>
            {result.citationCheck.missingSources.map((m, i) => (
              <p key={i} className="text-[11px] text-rose-500">{m}</p>
            ))}
          </div>
        )}
      </div>

      {/* 3. 문법/표현 */}
      <div className="p-4 border border-slate-100 rounded-2xl space-y-2">
        <div className="flex items-center gap-2">
          <AlignLeft className="size-4 text-indigo-500 shrink-0" />
          <h4 className="font-bold text-slate-800 text-sm flex-1">문법 &amp; 표현</h4>
          <StatusBadge status={result.expressionCheck.status} />
        </div>
        <ul className="space-y-1">
          {result.expressionCheck.feedback.map((f, i) => (
            <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-1.5">
              <span className="text-slate-300 shrink-0">•</span>{f}
            </li>
          ))}
        </ul>
      </div>

      {/* 4. 유사도 위험 (표절 아님) */}
      <div className="p-4 border border-amber-100 bg-amber-50/30 rounded-2xl space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-amber-500 shrink-0" />
          <h4 className="font-bold text-slate-800 text-sm flex-1">유사도 위험 점검</h4>
          <SimilarityBadge status={result.similarityRisk.status} />
        </div>
        <ul className="space-y-1">
          {result.similarityRisk.feedback.map((f, i) => (
            <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-1.5">
              <span className="text-slate-300 shrink-0">•</span>{f}
            </li>
          ))}
        </ul>
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-800 leading-relaxed">
          {result.similarityRisk.disclaimer}
        </div>
      </div>

      {/* 점검 시각 */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
        <Clock className="size-3" />
        <span>마지막 점검: {new Date(result.checkedAt).toLocaleString('ko-KR')}</span>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={handleRunCheck}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="size-3.5" />
          다시 점검하기
        </button>
        <button
          onClick={() => navigate('/draft')}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          초안 수정하기
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );

  // ── idle / ready 상태: 준비 화면 ─────────────────────────────────────────
  const renderReadyPanel = () => (
    <div className="space-y-6">
      {/* 현재 작성량 요약 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <AlignLeft className="size-4" />, label: '총 작성량', value: `${content.totalCharacters}자`, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { icon: <BookOpen className="size-4" />, label: '작성 섹션', value: `${[content.draftIntro, content.draftBody, content.draftConclusion].filter(t => t.length > 50).length}/3`, color: 'text-violet-600', bg: 'bg-violet-50' },
          { icon: <Link2 className="size-4" />, label: '등록 출처', value: `${content.sourceCount}개`, color: 'text-sky-600', bg: 'bg-sky-50' },
          { icon: <TrendingUp className="size-4" />, label: '주장 노드', value: `${content.claims.length}개`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-sm">
            <div className={`${item.bg} ${item.color} p-2 rounded-xl`}>{item.icon}</div>
            <p className="text-base font-extrabold text-slate-800">{item.value}</p>
            <p className="text-[10px] text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 점검 가능 여부 */}
      {eligibility.eligible ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
          <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold text-emerald-800">AI 최종 점검 준비 완료</p>
            <p className="text-emerald-700 text-xs mt-0.5">현재 작성 내용을 바탕으로 점검을 실행할 수 있습니다.</p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <XCircle className="size-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-700 text-sm">점검할 작성 내용이 부족합니다</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                AI 최종 점검은 사용자가 작성한 초안과 미션 작업물을 바탕으로 진행됩니다.<br />
                서론, 본론, 결론 또는 데일리 미션 작업 공간에 글을 작성한 뒤 다시 시도해주세요.
              </p>
            </div>
          </div>
          {/* 작성량 프로그레스바 */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-slate-500">
              <span>현재 작성량: {content.totalCharacters}자</span>
              <span>최소 {eligibility.minRequired}자</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-400 rounded-full transition-all"
                style={{ width: `${Math.min(100, (content.totalCharacters / eligibility.minRequired) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => navigate('/draft')}
              className="flex-1 bg-indigo-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              초안 작성하러 가기
            </button>
            <button
              onClick={() => navigate('/daily-plan')}
              className="flex-1 bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl hover:bg-slate-300 transition-colors"
            >
              데일리 미션 작업하기
            </button>
          </div>
        </div>
      )}

      {/* 점검 실행 버튼 */}
      <button
        onClick={handleRunCheck}
        disabled={!eligibility.eligible}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all ${
          eligibility.eligible
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 cursor-pointer'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        <Play className="size-4" />
        AI 최종 점검 실행
      </button>

      {!eligibility.eligible && (
        <p className="text-center text-xs text-slate-400">
          최소 {eligibility.minRequired}자 이상 작성해야 점검할 수 있습니다.
          {state.project?.targetUnit === 'characters' && (
            <span className="block text-amber-600 font-semibold mt-0.5">
              글자 수 기준 과제는 최소 {MIN_CHARACTERS_FOR_CHAR_UNIT.toLocaleString()}자 이상 작성해야 합니다.
            </span>
          )}
        </p>
      )}
    </div>
  );

  // ── 점검 중 ───────────────────────────────────────────────────────────────
  const renderChecking = () => (
    <div className="py-12 flex flex-col items-center gap-5">
      <div className="relative size-16">
        <svg className="animate-spin size-16 text-indigo-600" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" strokeOpacity="0.15" />
          <path d="M32 4a28 28 0 0 1 28 28" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <ShieldCheck className="absolute inset-0 m-auto size-7 text-indigo-500" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="font-extrabold text-slate-800">현재 작성 내용 분석 중...</h3>
        <p className="text-xs text-slate-500">사용자가 작성한 초안, 미션 작업물, 출처, 주장&amp;근거를 점검하고 있습니다.</p>
      </div>
      <div className="w-full max-w-sm space-y-1">
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>점검 진행률</span><span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );

  const projectLang = state.project?.language ?? '한국어';
  const langGuide = projectLang === '영어'
    ? '영어 학술 표현과 문단 흐름을 중심으로 점검합니다.'
    : projectLang === '한국어+영어'
    ? '한국어·영어 혼용 문장과 논리 연결을 중심으로 점검합니다.'
    : '한국어 문장 흐름과 논리 연결을 중심으로 점검합니다.';

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* 제목 */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">AI 최종 점검</h2>
        <p className="text-sm text-slate-500 mt-1">
          사용자가 작성한 초안과 미션 작업물을 바탕으로 논리 흐름, 인용, 표현 등을 종합 점검합니다.
        </p>
        {state.project && (
          <p className="text-xs text-indigo-600 font-semibold mt-1">
            📌 {langGuide}
          </p>
        )}
      </div>

      {/* 메인 패널 */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        {auditState === 'checking' && renderChecking()}
        {auditState === 'result' && savedResult && renderResultCard(savedResult)}
        {(auditState === 'idle' || auditState === 'ready') && renderReadyPanel()}
      </div>

      {/* 면책 고지 */}
      <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-2xl text-[10px] text-slate-500 leading-normal flex items-start gap-2">
        <Info className="size-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>안내:</strong> 본 AI 점검은 사용자가 입력한 내용을 기반으로 하는 자가 진단 도구입니다.
          외부 데이터베이스와 비교하는 실제 표절 검사가 아니며, 정확한 표절률은 학교 표절 검사 도구 또는
          외부 서비스(Turnitin, Copy Killer 등)를 이용하세요.
          제출 전 지도교수 또는 학술 규정 가이드를 반드시 확인하십시오.
        </span>
      </div>
    </div>
  );
}
