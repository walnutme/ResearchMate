import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { countWords, countCharacters, calculateRecommendedAmount } from '../lib/wordCount';
import {
  FileText,
  Sparkles,
  Copy,
  ArrowRight,
  Globe,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

// ─── 진행률 Progress Bar ─────────────────────────────────────────────────────
function WordProgress({ current, recommended, label, unitLabel }: { current: number; recommended: number; label: string; unitLabel: string }) {
  const pct = recommended > 0 ? Math.min(100, Math.round((current / recommended) * 100)) : 0;
  const over = current > recommended;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
        <span>{label}</span>
        <span className={over ? 'text-emerald-600' : 'text-slate-500'}>
          {current.toLocaleString()} / {recommended.toLocaleString()}{unitLabel}
        </span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${over ? 'bg-emerald-500' : 'bg-indigo-600'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-right text-[10px] text-slate-400">{unitLabel === '자' ? '권장 글자 작성률' : '권장 단어 작성률'} {pct}%</div>
    </div>
  );
}

export default function DraftWriter() {
  const { state, updateDraft } = useAppState();
  const navigate = useNavigate();

  if (!state.project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50/50 rounded-3xl p-8 border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-sm">
          <FileText className="size-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">진행 중인 연구 과제가 없습니다.</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            연구 과제를 등록하시면 각 문단 구조(서론/본론/결론)에 맞춘 학술 표기법 수정기 및 글쓰기 워크스페이스가 열립니다.
          </p>
        </div>
        <button
          onClick={() => navigate('/project-setup')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all cursor-pointer shadow-sm flex items-center gap-2"
        >
          첫 연구 과제 등록하고 시작하기
          <ChevronRight className="size-4" />
        </button>
      </div>
    );
  }

  // ── 권장 분량 계산 ──────────────────────────────────────────────────────
  const recommended = calculateRecommendedAmount({
    targetAmountNum: state.project.targetAmountNum,
    targetUnit: state.project.targetUnit ?? 'words',
  });
  const hasTarget = state.project.targetAmountNum && state.project.targetAmountNum > 0;

  // 글자/단어 수 켄터 선택
  const isCharMode = recommended.unit === 'characters';
  const countFn = isCharMode ? countCharacters : countWords;
  const unitLabel = isCharMode ? '자' : '단어';

  // ── 탭 상태 ────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'intro' | 'body' | 'conclusion'>('intro');
  const [text, setText] = useState('');

  // AI 리라이터
  const [userSentence, setUserSentence] = useState('');
  const [rewrittenResult, setRewrittenResult] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);

  // 작성 언어
  const projectLang = state.project.language ?? '한국어';
  const isEnglish = projectLang === '영어';

  // 탭 전환 시 텍스트 동기화
  useEffect(() => {
    if (activeTab === 'intro') setText(state.draft.introText || '');
    else if (activeTab === 'body') setText(state.draft.bodyText || '');
    else setText(state.draft.conclusionText || '');
    setRewrittenResult('');
  }, [activeTab, state.draft]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);

    // 권장 분량 기반 progress 계산
    const amount = countFn(val);
    let recAmount = 0;
    if (activeTab === 'intro') recAmount = recommended.intro;
    else if (activeTab === 'body') recAmount = recommended.body;
    else recAmount = recommended.conclusion;

    const progress = recAmount > 0 ? Math.min(100, Math.round((amount / recAmount) * 100)) : 0;

    if (activeTab === 'intro') updateDraft({ introText: val, introProgress: progress });
    else if (activeTab === 'body') updateDraft({ bodyText: val, bodyProgress: progress });
    else updateDraft({ conclusionText: val, conclusionProgress: progress });
  };

  // 현재 탭 분량
  const currentAmount = countFn(text);

  // 전체 분량
  const totalAmount =
    countFn(state.draft.introText || '') +
    countFn(state.draft.bodyText || '') +
    countFn(state.draft.conclusionText || '');
  const totalPct = recommended.total > 0
    ? Math.min(100, Math.round((totalAmount / recommended.total) * 100))
    : 0;

  // AI 리라이터
  const handleRewrite = () => {
    if (!userSentence.trim()) return;
    setIsRewriting(true);
    setTimeout(() => {
      setIsRewriting(false);
      const input = userSentence.trim();
      if (isEnglish) {
        if (input.toLowerCase().includes('impact') || input.toLowerCase().includes('affect')) {
          setRewrittenResult('This study examines the statistically significant correlation between AI-assisted tools and the alleviation of academic writing anxiety.');
        } else if (input.toLowerCase().includes('research') || input.toLowerCase().includes('literature')) {
          setRewrittenResult('A synthesis of the extant literature reveals that the primary mediating variable of qualitative feedback disparities is the presence of extrinsic incentives.');
        } else {
          setRewrittenResult(`Empirical analysis substantiates that ${input.replace('.', '')} demonstrates statistical significance, thereby corroborating the theoretical validity of the proposed argument.`);
        }
      } else {
        if (input.includes('미치는 영향') || input.includes('영향을 준다')) {
          setRewrittenResult('본 연구는 AI 보조 도구가 학술적 글쓰기 불안 해소 및 집필 유연성에 미치는 유의미한 상관관계에 관해 고찰합니다.');
        } else if (input.includes('자료') || input.includes('선행연구')) {
          setRewrittenResult('기존의 문헌적 논의를 종합해 볼 때, 피드백의 질적 격차를 유발하는 핵심 매개 변인은 외재적 보상의 유무로 파악됩니다.');
        } else {
          setRewrittenResult(`실증 분석 결과에 의하면, ${input.replace('.', '')}에 관해 통계적 유의성이 검증되며 이는 논증 타당성을 뒷받침합니다.`);
        }
      }
    }, 1200);
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    alert('학술 표현이 클립보드에 복사되었습니다!');
  };

  // 가이드
  const guides = {
    intro: [
      { title: isEnglish ? 'Problem Statement' : '문제 제기 (Problem Statement)', desc: isEnglish ? 'Identify the unresolved gap in the academic field and state its significance.' : '현재 전공 분야 내에서 해결되지 않은 한계점 및 필요성을 환기시킵니다.' },
      { title: isEnglish ? 'Research Objective' : '연구 목적 (Research Objective)', desc: isEnglish ? 'Define the academic goal this study aims to address based on prior research.' : '선행 연구 분석을 바탕으로 본 연구가 해결하고자 하는 학술적 목표를 규정합니다.' },
      { title: isEnglish ? 'Research Question' : '연구 질문 (Research Question)', desc: isEnglish ? 'State a specific, empirically verifiable hypothesis or analysis target.' : '구체적이고 실증 검증이 가능한 가설이나 분석 대상을 선언합니다.' }
    ],
    body: [
      { title: isEnglish ? 'Logical Claim' : '주장 제시 (Logical Claim)', desc: isEnglish ? 'Present your core argument from the Argument Builder as the opening sentence.' : '아규먼트 빌더에서 정의한 핵심 주장을 첫 번째 두괄식 문장으로 작성합니다.' },
      { title: isEnglish ? 'Evidence & Data' : '근거 연계 (Evidence & Data)', desc: isEnglish ? 'Organically embed citations and statistics from your Sources tab.' : 'Sources 탭에서 정리한 인용구 및 통계 지표를 문단 내에 유기적으로 삽입합니다.' },
      { title: isEnglish ? 'Analysis & Counter' : '심층 분석 (Analysis & Counter)', desc: isEnglish ? 'Interpret how evidence supports your claim and address potential counterarguments.' : '인용된 사실이 내 주장을 어떻게 보강하는지 해석하고, 예상되는 반론을 짚어 방어합니다.' }
    ],
    conclusion: [
      { title: isEnglish ? 'Executive Summary' : '연구 요약 (Executive Summary)', desc: isEnglish ? 'Re-deliver the key findings proven in the body to the reader.' : '본론에서 입증해 낸 핵심 증명 결과들을 독자에게 다시 한번 요약 전달합니다.' },
      { title: isEnglish ? 'Academic Contribution' : '학술적 의의 (Academic Contribution)', desc: isEnglish ? 'Emphasize the implications your findings contribute to the academic field.' : '이 결과가 기존 학계나 연구 풍토에 기여하는 시사점을 강조합니다.' },
      { title: isEnglish ? 'Limitations' : '한계 및 후속 연구 (Limitations)', desc: isEnglish ? 'Acknowledge the study\'s limitations honestly and suggest future research.' : '연구 표본이나 범위 등의 한계를 솔직히 고백하고 보완책을 후속 연구로 제시합니다.' }
    ]
  };

  const academicPhrases = isEnglish ? [
    { text: 'Consequently,', type: '결과' },
    { text: 'Furthermore,', type: '심화' },
    { text: 'In alignment with the literature,', type: '인용' },
    { text: 'This study aims to examine', type: '서두' },
    { text: 'While critics argue that', type: '반론' },
    { text: 'Therefore, statistical significance is confirmed.', type: '분석' },
  ] : [
    { text: '이에 따라 (Consequently)', type: '결과' },
    { text: '더 나아가 (Furthermore)', type: '심화' },
    { text: '기존 논의와 궤를 같이하여 (In alignment with literature)', type: '인용' },
    { text: '본 연구는 ~을 실증 규명하고자 한다 (This study aims to examine)', type: '서두' },
    { text: '일각에서는 ~라고 비판하지만 (While critics argue that)', type: '반론' },
    { text: '따라서 통계적 유의성이 검증된다 (Therefore, statistical significance)', type: '분석' },
  ];

  // 현재 탭의 권장 단어 수
  const tabRecommended = {
    intro: recommended.intro,
    body: recommended.body,
    conclusion: recommended.conclusion,
  }[activeTab];

  const tabLabel = { intro: '서론', body: '본론', conclusion: '결론' }[activeTab];

  return (
    <div className="space-y-6">

      {/* Title */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">초안 집필 (Draft Writer)</h2>
          <p className="text-sm text-slate-500">
            단원별 논리 가이드를 준수하며 논문의 초안을 직접 작성해 나가는 작업 공간입니다.
          </p>
        </div>
        {/* 작성 언어 뱃지 */}
        <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-700 shrink-0">
          <Globe className="size-3.5" />
          작성 언어: {projectLang}
        </div>
      </div>

      {/* 목표 미설정 안내 */}
      {!hasTarget && (
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800">
          <AlertCircle className="size-4 shrink-0 mt-0.5 text-amber-500" />
          {isCharMode
            ? '목표 분량이 설정되지 않아 기본 6,000자 기준으로 권장 글자 수를 계산합니다.'
            : '목표 분량이 설정되지 않아 기본 2,000단어 기준으로 권장 단어 수를 계산합니다.'}
        </div>
      )}

      {/* 전체 진행률 요약 */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-600">
            {isCharMode ? '전체 초안 목표 글자 대비 작성률' : '전체 초안 목표 단어 대비 작성률'}
          </span>
          <span className="text-xs font-bold text-indigo-600">{totalAmount.toLocaleString()} / {recommended.total.toLocaleString()}{unitLabel}</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${totalPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>{isCharMode ? '전체 권장 글자 작성률' : '전체 권장 단어 작성률'} {totalPct}%</span>
          <span>목표: {recommended.total.toLocaleString()}{unitLabel}
            {recommended.pageNote && ` (${recommended.pageNote})`}
            {!isCharMode && !recommended.pageNote && ` (${state.project.targetAmountNum}${state.project.targetUnit === 'pages' ? '페이지' : '단어'})`}
          </span>
        </div>

        {/* 섹션별 요약 */}
        <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100">
          {[
            { key: 'intro', label: '서론', rec: recommended.intro, cur: countFn(state.draft.introText || '') },
            { key: 'body', label: '본론', rec: recommended.body, cur: countFn(state.draft.bodyText || '') },
            { key: 'conclusion', label: '결론', rec: recommended.conclusion, cur: countFn(state.draft.conclusionText || '') },
          ].map(s => {
            const pct = s.rec > 0 ? Math.min(100, Math.round((s.cur / s.rec) * 100)) : 0;
            return (
              <div key={s.key} className="text-center">
                <p className="text-[10px] font-bold text-slate-500 mb-1">{s.label}</p>
                <p className="text-sm font-extrabold text-slate-800">{s.cur} / {s.rec}{unitLabel}</p>
                <p className="text-[10px] text-indigo-500 font-semibold">{pct}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor Tabs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Editor Main Canvas */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">

          {/* Tab Selector */}
          <div className="flex border-b border-slate-100 pb-2">
            {[
              { id: 'intro', label: '서론 (Introduction)', progress: state.draft.introProgress },
              { id: 'body', label: '본론 (Body Paragraphs)', progress: state.draft.bodyProgress },
              { id: 'conclusion', label: '결론 (Conclusion)', progress: state.draft.conclusionProgress }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all relative cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  {tab.label}
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">
                    {tab.progress}%
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Guidelines */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">이 단원에서 포함해야 할 내용:</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              {guides[activeTab].map((guide, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/40 text-xs">
                  <span className="font-bold text-slate-800 block mb-0.5">{guide.title}</span>
                  <p className="text-slate-500 leading-normal">{guide.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <FileText className="size-3.5" />
                글쓰기 영역 (자동 저장)
              </span>
              <span>{text.length}자 (공백 포함)</span>
            </div>

            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder={isEnglish
                ? "Write your academic draft here. Use the expression templates and AI rewriter on the right as assistive tools..."
                : "여기에 학술 글쓰기 초안을 작성하세요. 오른쪽의 학술 표현 템플릿과 AI 리라이터를 보조 도구로 활용해 보세요..."}
              className="w-full h-80 px-4 py-4 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-slate-700 leading-relaxed font-sans placeholder-slate-400"
            />
          </div>

          {/* 섹션별 분량 + 권장 작성률 */}
          <WordProgress
            current={currentAmount}
            recommended={tabRecommended}
            label={`${tabLabel}: 현재 작성 ${unitLabel === '자' ? '글자' : '단어'} 수 / 권장 ${unitLabel === '자' ? '글자' : '단어'} 수`}
            unitLabel={unitLabel}
          />

        </div>

        {/* AI Assistant Panel */}
        <div className="space-y-6">

          {/* Sentence Rewriter */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5 pb-3 border-b border-slate-50">
              <Sparkles className="size-4.5 text-indigo-600" />
              <h3 className="font-bold text-slate-800 text-sm">AI 학술 표현 리라이터</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">바꾸고 싶은 일반 구절</label>
                <input
                  type="text"
                  value={userSentence}
                  onChange={e => setUserSentence(e.target.value)}
                  placeholder={isEnglish ? "e.g. AI helps improve writing quality." : "예: 이 연구는 인공지능이 글을 돕는 영향을 본다."}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-600"
                />
              </div>

              <button
                onClick={handleRewrite}
                disabled={isRewriting || !userSentence.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
              >
                {isRewriting ? (
                  <>
                    <span className="animate-spin size-3.5 border-2 border-white border-t-transparent rounded-full" />
                    학술적 톤으로 변경 중...
                  </>
                ) : (
                  <>
                    학술 표현으로 변환하기
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </button>

              {rewrittenResult && (
                <div className="p-3 bg-indigo-50/40 border border-indigo-100/50 rounded-xl space-y-2 animate-in fade-in duration-200">
                  <span className="block text-[10px] font-bold text-indigo-600">추천 학술 표현</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">{rewrittenResult}</p>
                  <button
                    onClick={() => handleCopy(rewrittenResult)}
                    className="text-[10px] font-extrabold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="size-3" />
                    문장 복사하기
                  </button>
                </div>
              )}
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl text-[10px] text-slate-400 leading-normal">
              {isEnglish
                ? '⚠️ The AI rewriter is an assistive tool for expression only. Your original ideas remain unchanged.'
                : '⚠️ AI 점검은 문장 표현 변환을 돕는 보조 도구이며, 연구자의 원래 아이디어와 핵심 의도를 변경하지 않습니다.'}
            </div>
          </div>

          {/* Academic Phrases */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">논증 문맥용 학술 어휘</h3>
            <p className="text-[11px] text-slate-400">클릭하면 클립보드로 문구가 복사됩니다.</p>

            <div className="space-y-2">
              {academicPhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopy(phrase.text.split(' (')[0])}
                  className="p-2.5 hover:bg-slate-50 border border-slate-100 hover:border-indigo-100/50 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-700">{phrase.text}</span>
                  <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-bold uppercase">{phrase.type}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
