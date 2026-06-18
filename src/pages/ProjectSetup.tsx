import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { Project, AssignmentType, CurrentStatusType, CitationStyleType, FileFormatType, DailyWorkTimeType, ProjectLanguage } from '../types';
import { Calendar, FileText, Settings, Wallet, ChevronLeft, ChevronRight, Check, Globe } from 'lucide-react';

export default function ProjectSetup() {
  const navigate = useNavigate();
  const { setupProject, state } = useAppState();

  const [step, setStep] = useState(1);

  // Form states
  const [assignmentType, setAssignmentType] = useState<AssignmentType>('thesis');
  const [topic, setTopic] = useState('');
  const [major, setMajor] = useState('사회과학');

  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  // 목표 분량: 숫자 + 단위 분리
  const [targetAmountNum, setTargetAmountNum] = useState<number>(10);
  const [targetUnit, setTargetUnit] = useState<'pages' | 'words' | 'characters'>('pages');

  const [currentStatus, setCurrentStatus] = useState<CurrentStatusType>('topic_exploration');

  const [citationStyle, setCitationStyle] = useState<CitationStyleType>('APA');
  const [formatType, setFormatType] = useState<FileFormatType>('PDF');
  const [dailyWorkTime, setDailyWorkTime] = useState<DailyWorkTimeType>('1h');

  // 작성 언어: 회원가입 언어를 기본값으로
  const userLangMap: Record<string, ProjectLanguage> = { ko: '한국어', en: '영어', both: '한국어+영어' };
  const defaultLang: ProjectLanguage = state.user
    ? (userLangMap[state.user.language] ?? '한국어')
    : '한국어';
  const [language, setLanguage] = useState<ProjectLanguage>(defaultLang);

  const [deposit, setDeposit] = useState<number>(10000);
  const [customDeposit, setCustomDeposit] = useState('');
  const [depositType, setDepositType] = useState<'5k' | '10k' | 'custom'>('10k');
  const [selectedPlan, setSelectedPlan] = useState<'minimal' | 'complete'>('complete');

  const nextStep = () => {
    if (step === 1 && !topic.trim()) {
      alert('과제 주제를 입력해 주세요.');
      return;
    }
    if (step === 2 && (!targetAmountNum || targetAmountNum <= 0)) {
      alert('목표 분량을 입력해 주세요.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDeposit = depositType === 'custom' ? Number(customDeposit) || 0 : deposit;
    const targetAmountStr = `${targetAmountNum} ${
      targetUnit === 'pages' ? 'pages' : targetUnit === 'characters' ? 'characters' : 'words'
    }`;

    setupProject({
      type: assignmentType,
      topic: topic.trim(),
      major,
      deadline,
      targetAmount: targetAmountStr,
      targetAmountNum,
      targetUnit,
      language,
      currentStatus,
      citationStyle,
      format: formatType,
      dailyWorkTime,
      deposit: finalDeposit,
      selectedPlan,
    });
    navigate('/dashboard');
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>STEP {step} OF {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% 완료</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-10 transition-all">

          {/* STEP 1: Basic Project Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <FileText className="size-5 text-indigo-600" />
                  과제 기본 정보 설정
                </h3>
                <p className="text-sm text-slate-500">어떤 종류의 학술 과제물을 진행하고 계신가요?</p>
              </div>

              {/* Assignment Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">과제 유형</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'thesis', label: '개인 논문' },
                    { id: 'report', label: '레포트' },
                    { id: 'research_paper', label: '연구보고서' },
                    { id: 'team_report', label: '팀 프로젝트 보고서' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAssignmentType(item.id as AssignmentType)}
                      className={`py-3.5 px-4 border rounded-xl font-medium text-sm text-left transition-all flex items-center justify-between cursor-pointer ${
                        assignmentType === item.id
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {item.label}
                      {assignmentType === item.id && <Check className="size-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic / Title */}
              <div>
                <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-2">과제 주제 또는 제목</label>
                <input
                  id="topic"
                  type="text"
                  required
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="예: AI 서비스 품질이 사용자 충성도에 미치는 영향"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all"
                />
              </div>

              {/* Major Field */}
              <div>
                <label htmlFor="major" className="block text-sm font-semibold text-slate-700 mb-2">분야</label>
                <select
                  id="major"
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all bg-white"
                >
                  {['사회과학', '인문학', '국제학', '자연과학', '공학', '예술/디자인', '기타'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Writing Language */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                  <Globe className="size-4 text-indigo-500" />
                  작성 언어
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: '한국어',     flag: '🇰🇷' },
                    { value: '영어',       flag: '🇺🇸' },
                    { value: '한국어+영어', flag: '🇰🇷🇺🇸' },
                    { value: '일본어',     flag: '🇯🇵' },
                    { value: '중국어(간체)', flag: '🇨🇳' },
                    { value: '중국어(번체)', flag: '🇹🇼' },
                    { value: '스페인어',   flag: '🇪🇸' },
                    { value: '프랑스어',   flag: '🇫🇷' },
                    { value: '독일어',     flag: '🇩🇪' },
                    { value: '포르투갈어', flag: '🇵🇹' },
                    { value: '아랍어',     flag: '🇸🇦' },
                    { value: '러시아어',   flag: '🇷🇺' },
                    { value: '기타',       flag: '🌐' },
                  ] as { value: ProjectLanguage; flag: string }[]).map(({ value: lang, flag }) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      className={`py-2.5 px-2 border rounded-xl font-semibold text-xs text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        language === lang
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      <span>{flag}</span>
                      <span>{lang}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  회원가입 시 선택한 주 작성 언어가 기본값입니다. 이 과제에서만 변경할 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Deadline & Volumes */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Calendar className="size-5 text-indigo-600" />
                  일정 및 분량 계획
                </h3>
                <p className="text-sm text-slate-500">완성 마감일과 작성하려는 세부 분량을 알려주세요.</p>
              </div>

              {/* Deadline */}
              <div>
                <label htmlFor="deadline" className="block text-sm font-semibold text-slate-700 mb-2">제출 마감일</label>
                <input
                  id="deadline"
                  type="date"
                  required
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all"
                />
              </div>

              {/* Target Volume — 숫자 + 단위 분리 */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">목표 분량</label>
                <div className="flex gap-3">
                  <input
                    id="targetAmountNum"
                    type="number"
                    min={1}
                    required
                    value={targetAmountNum}
                    onChange={e => setTargetAmountNum(Number(e.target.value))}
                    placeholder="예: 10"
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all"
                  />
                  <div className="flex gap-2">
                    {[
                      { id: 'pages', label: '페이지' },
                      { id: 'words', label: '단어' },
                      { id: 'characters', label: '글자' }
                    ].map(u => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setTargetUnit(u.id as 'pages' | 'words' | 'characters')}
                        className={`px-4 py-3 border rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
                          targetUnit === u.id
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  {targetUnit === 'pages'
                    ? `1페이지 = 500단어 기준으로 환산됩니다. (현재 약 ${(targetAmountNum * 500).toLocaleString()}단어)`
                    : targetUnit === 'characters'
                    ? `입력한 글자 수를 그대로 목표로 사용합니다. (공백 제외 글자 기준)`
                    : `입력한 단어 수를 그대로 목표로 사용합니다.`}
                </p>
              </div>

              {/* Current Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">현재 작성 단계</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'topic_exploration', label: '주제 탐색 중 (자료 구상 및 가설 정의)' },
                    { id: 'data_collection', label: '자료 수집 중 (선행 연구 서칭)' },
                    { id: 'outline', label: '개요 작성 중 (구조화 및 목차 설정)' },
                    { id: 'drafting', label: '초안 작성 중 (본격적인 집필)' },
                    { id: 'revision', label: '수정 중 (인용 및 단락 퇴고)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrentStatus(item.id as CurrentStatusType)}
                      className={`py-3 px-4 border rounded-xl font-medium text-sm text-left transition-all flex items-center justify-between cursor-pointer ${
                        currentStatus === item.id
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {item.label}
                      {currentStatus === item.id && <Check className="size-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Setup Styles and Commitment */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Settings className="size-5 text-indigo-600" />
                  작성 환경 및 시간 설정
                </h3>
                <p className="text-sm text-slate-500">인용 서식과 일별 가용 시간을 입력받아 하루 작업량을 조정합니다.</p>
              </div>

              {/* Citation Style */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">인용 서식 (Citation Style)</label>
                <div className="flex flex-wrap gap-2">
                  {['APA', 'MLA', 'Chicago', 'IEEE', 'other'].map(item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCitationStyle(item as CitationStyleType)}
                      className={`py-2 px-4 border rounded-full font-medium text-xs transition-all cursor-pointer ${
                        citationStyle === item
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      {item === 'other' ? '기타 양식' : item}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Format */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">최종 제출 파일 형식</label>
                <div className="flex flex-wrap gap-2">
                  {['PDF', 'DOCX', 'PPTX', 'other'].map(item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFormatType(item as FileFormatType)}
                      className={`py-2 px-4 border rounded-full font-medium text-xs transition-all cursor-pointer ${
                        formatType === item
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      {item === 'other' ? '기타 형식' : item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Work Time */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">하루 작업 가능 시간</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: '15m', label: '15분' },
                    { id: '30m', label: '30분' },
                    { id: '1h', label: '1시간' },
                    { id: '2h_plus', label: '2시간 이상' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDailyWorkTime(item.id as DailyWorkTimeType)}
                      className={`py-3 border rounded-xl font-medium text-xs text-center transition-all cursor-pointer ${
                        dailyWorkTime === item.id
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Motivation */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Wallet className="size-5 text-indigo-600" />
                  동기부여 보증금 및 집필 플랜
                </h3>
                <p className="text-sm text-slate-500">마감일까지 매일 미션을 끝까지 완수할 수 있는 규칙을 설계합니다.</p>
              </div>

              {/* Deposit */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">동기부여 보증금 설정</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => { setDepositType('5k'); setDeposit(5000); }}
                    className={`py-3.5 border rounded-xl font-semibold text-sm text-center transition-all cursor-pointer ${
                      depositType === '5k'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    5,000원
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDepositType('10k'); setDeposit(10000); }}
                    className={`py-3.5 border rounded-xl font-semibold text-sm text-center transition-all cursor-pointer ${
                      depositType === '10k'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    10,000원
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepositType('custom')}
                    className={`py-3.5 border rounded-xl font-semibold text-sm text-center transition-all cursor-pointer ${
                      depositType === 'custom'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    직접 입력
                  </button>
                </div>

                {depositType === 'custom' && (
                  <input
                    type="number"
                    value={customDeposit}
                    onChange={e => setCustomDeposit(e.target.value)}
                    placeholder="원하는 보증금 금액을 입력하세요 (원)"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 transition-all"
                  />
                )}

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  * 미션 지연 시 보증금의 일부(500원)가 차감되며, 연속 성공 일수가 초기화됩니다. (실제 결제는 발생하지 않습니다)
                </p>
              </div>

              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">집필 미션 유형 설계</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSelectedPlan('minimal')}
                    className={`p-5 border rounded-2xl cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPlan === 'minimal'
                        ? 'border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-indigo-100 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mb-2">라이트 패스</span>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">현실적인 최소 목표 플랜</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        시간 압박이 있거나 진도가 밀렸을 때, 핵심 근거 분석과 필수 챕터 집필 위주로 압축하여 부담을 줄이는 속성 완성용 일정입니다.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 mt-4 flex items-center gap-1">
                      선택하기 <ChevronRight className="size-3.5" />
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedPlan('complete')}
                    className={`p-5 border rounded-2xl cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPlan === 'complete'
                        ? 'border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-indigo-100 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <span className="inline-block text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full mb-2">프리미엄 추천</span>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">완성도 높은 집중 플랜</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        선행 연구 읽기, 철저한 자료 분석, 루브릭 기반의 동료 검토 및 결론 퇴고까지 골고루 분배하여 A+ 퀄리티를 타겟팅하는 완벽 플랜입니다.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 mt-4 flex items-center gap-1">
                      선택하기 <ChevronRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="size-4" />
                이전
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/onboarding')}
                className="px-5 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer"
              >
                온보딩으로
              </button>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer"
              >
                다음 단계
                <ChevronRight className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-100 transition-all flex items-center gap-1 cursor-pointer"
              >
                과제 플랜 생성 완료!
                <Check className="size-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
