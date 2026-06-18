import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import StatCard from '../components/common/StatCard';
import ProgressRing from '../components/common/ProgressRing';
import StatusBadge from '../components/common/StatusBadge';
import ProjectSwitcher from '../components/project/ProjectSwitcher';
import { 
  Trophy, 
  Flame, 
  Wallet, 
  Calendar, 
  Play, 
  Check, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const { state, completeMission, delayMission } = useAppState();
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [lastPenalty, setLastPenalty] = useState(0);

  // Get current date string (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  // Find today's missions (or the first pending/active mission)
  const isMissionActive = (m: any) => m.status !== 'completed';
  const todayMissions = state.missions.filter(m => m.date === todayStr);
  const activeMissionsList = state.missions.filter(isMissionActive);
  const activeMission = todayMissions.find(isMissionActive) || activeMissionsList[0];

  // Calculate stats
  const totalMissions = state.missions.length;
  const completedMissions = state.missions.filter(m => m.status === 'completed').length;
  const overallProgress = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;

  const handleComplete = (id: string) => {
    completeMission(id);
    alert('🎉 미션을 성공적으로 완료했습니다! +100포인트를 획득했습니다.');
  };

  const handleDelay = (id: string) => {
    const targetMission = state.missions.find(m => m.id === id);
    let penalty = 500;
    if (targetMission) {
      const progress = targetMission.progress || 0;
      if (progress >= 71) {
        penalty = 0;
      } else if (progress >= 21) {
        penalty = 250;
      }
    }
    setLastPenalty(penalty);
    delayMission(id);
    setShowPenaltyModal(true);
  };

  // Get progress history from the active project
  const activeProjectId = state.project?.id;
  const progressHistory = activeProjectId ? (state.progressHistoryByProject?.[activeProjectId] ?? []) : [];

  // Next 3 upcoming tasks
  const nextTasks = activeMissionsList
    .filter((m: any) => m.id !== activeMission?.id)
    .slice(0, 3);

  if (!state.project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50/50 rounded-3xl p-8 border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-sm">
          <Bookmark className="size-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">환영합니다! 진행 중인 연구 과제가 없습니다.</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            리서치메이트와 함께 데일리 미션을 수행하고, 피어 리뷰를 주고받으며 완벽한 논문/레포트를 완성해 보세요.
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

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {state.user?.name}님, 오늘의 연구 미션을 확인해보세요.
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            현재 선택된 과제: <span className="text-indigo-600 font-bold">{state.project?.topic || '없음'}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <ProjectSwitcher />
          <div className="flex items-center gap-1.5">
            <span className="text-xs bg-slate-100 px-3 py-1.5 rounded-lg font-semibold text-slate-600">
              {state.user?.level === 'undergrad' ? '학부생' : state.user?.level === 'undergrad_researcher' ? '학부 연구생' : '대학원생'}
            </span>
            <span className="text-xs bg-slate-100 px-3 py-1.5 rounded-lg font-semibold text-slate-600">
              {state.user?.major}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="연속 완수"
          value={`${state.streak ?? 0}일`}
          icon={Flame}
          color="rose"
          description={
            (state.streak ?? 0) === 0
              ? (state.longestStreak ?? 0) === 0
                ? "최장 연속 기록이 아직 없습니다"
                : "아직 연속 완료 기록이 없습니다"
              : "지연 없이 매일 완료 중"
          }
          trend={
            (state.longestStreak ?? 0) > 0
              ? { value: `🔥 최장 ${state.longestStreak}일`, isPositive: true }
              : undefined
          }
        />
        <StatCard
          title="누적 포인트"
          value={`${state.points.toLocaleString()} P`}
          icon={Trophy}
          color="amber"
          description="리뷰 우선 배정 등에 활용"
          trend={
            state.points > 0
              ? { value: `+${state.points.toLocaleString()} P 획득`, isPositive: true }
              : undefined
          }
        />
        <StatCard
          title="보증금 잔액"
          value={`${state.deposit.toLocaleString()}원`}
          icon={Wallet}
          color="emerald"
          description="지연 페널티 발생 시 차감"
          trend={{ value: '100% 안전', isPositive: true }}
        />
        <div className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-sm flex items-center justify-between select-none">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-semibold">전체 집필 진행률</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1.5 tracking-tight">{overallProgress}%</h3>
            <p className="text-[10px] text-slate-400 mt-1">
              {completedMissions === 0
                ? "아직 완료한 미션이 없습니다"
                : `총 ${totalMissions}개 중 ${completedMissions}개 완료`
              }
            </p>
          </div>
          <ProgressRing progress={overallProgress} size={64} strokeWidth={6} />
        </div>
      </div>

      {/* Main Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Middle Column (Today's Mission & Graph) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Active Mission Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-50/50 text-indigo-700 font-bold px-4 py-1.5 rounded-bl-xl text-xs flex items-center gap-1">
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 animate-ping" />
              오늘 수행 미션
            </div>

            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-2">TODAY'S MISSION</h3>
            
            {activeMission ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge type="mission-type" value={activeMission.type} />
                      <StatusBadge type="mission-status" value={activeMission.status} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 leading-snug">
                      {activeMission.title}
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-3 px-4 bg-slate-50 rounded-xl text-xs text-slate-500">
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">목표 작성 분량</span>
                    <span className="font-bold text-slate-700">{activeMission.targetAmount || activeMission.amount}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">예상 소요 시간</span>
                    <span className="font-bold text-slate-700">약 {activeMission.estimatedMinutes || activeMission.duration}분</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-semibold mb-0.5 font-bold">수행 예정일</span>
                    <span className="font-bold text-slate-700">{activeMission.date}</span>
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                    {activeMission.status === 'readyToComplete' ? (
                      <span className="text-emerald-600 font-extrabold">완료 처리 가능 (모든 기준 충족)</span>
                    ) : (
                      <span>현재 {activeMission.progress || 0}% 진행 중 (완료 기준 미달)</span>
                    )}
                    <span className="text-slate-400 font-medium">자동 저장됨</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden w-full">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${activeMission.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {activeMission.status === 'readyToComplete' ? (
                    <button
                      onClick={() => handleComplete(activeMission.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-sm shadow-emerald-100 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="size-4" />
                      완료 처리
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/plan/${activeMission.id}`)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-sm shadow-indigo-100 flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                    >
                      <Play className="size-4" />
                      작업하러 가기
                    </button>
                  )}
                  <button
                    onClick={() => handleDelay(activeMission.id)}
                    className="px-4 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-100 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="미션 미루기"
                  >
                    하루 미루기
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-2">
                <p className="text-slate-500 font-medium">오늘 계획된 미션이 모두 완료되었습니다!</p>
                <button 
                  onClick={() => navigate('/plan')} 
                  className="text-xs text-indigo-600 font-bold hover:underline"
                >
                  전체 일정 캘린더에서 다음 미션 확인하기 &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Progress Chart */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
                  <TrendingUp className="size-4.5 text-indigo-600" />
                  누적 과제 완성도 추이
                </h3>
                <p className="text-xs text-slate-400">마감일까지 도달하기 위한 일자별 완성도 계획 및 현재 진척률</p>
              </div>
              {progressHistory.length > 0 && (
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  정상 궤도
                </span>
              )}
            </div>

            {progressHistory.length === 0 ? (
              <div className="h-64 w-full flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                  <TrendingUp className="size-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-700 text-sm">아직 완성도 기록이 없습니다</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    데일리 미션을 완료하면 과제 완성도 추이가 여기에 표시됩니다.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '12px' }}
                      formatter={(value) => [`${value}%`, '완성도']}
                    />
                    <Area type="monotone" dataKey="progress" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProgress)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (Next actions & helper banner) */}
        <div className="space-y-6">
          
          {/* Next Actions */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm mb-4">다음으로 해야 할 일</h3>
            
            {nextTasks.length > 0 ? (
              <div className="space-y-3">
                {nextTasks.map((task, idx) => (
                  <div 
                    key={task.id}
                    className="p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-indigo-100/50 rounded-xl transition-all flex items-start gap-3 cursor-pointer"
                    onClick={() => navigate('/plan')}
                  >
                    <div className="bg-slate-200/60 text-slate-600 font-bold text-xs size-5.5 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-700 truncate">{task.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-400">{task.date}</span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-[10px] text-slate-500 font-semibold">{task.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">다음 대기 중인 일정이 없습니다.</p>
            )}

            <button 
              onClick={() => navigate('/plan')}
              className="w-full text-center text-xs font-bold text-indigo-600 hover:text-indigo-700 mt-4 pt-3 border-t border-slate-50 flex items-center justify-center gap-0.5"
            >
              전체 세부 플랜 보기
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          {/* Peer Review Call to Action */}
          <div className="bg-indigo-950 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 size-24 bg-indigo-800 rounded-full opacity-30 blur-lg" />
            <h3 className="font-bold text-sm mb-1">피드백 질 향상 보상 모델</h3>
            <p className="text-xs text-indigo-200 leading-relaxed mb-4">
              성실하고 구체적인 근거를 기반으로 Peer Review를 작성해주면 최대 +150포인트 보상이 지급됩니다. 모인 포인트를 사용해 AI 1차 교정 및 피어 매칭 최우선권을 구매해 보세요!
            </p>
            <button
              onClick={() => navigate('/peer-review')}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-1 cursor-pointer"
            >
              리뷰 작성 및 검토하러 가기
              <ChevronRight className="size-3.5" />
            </button>
          </div>

          {/* Quick Links / Navigation Guide */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">연구 파트너 글쓰기 프로세스</h3>
            
            {[
              { label: '1. 관련 선행 연구 출처 정리', path: '/sources', tag: 'Sources' },
              { label: '2. 주장 & 근거 논리 구조 체킹', path: '/arguments', tag: 'Arguments' },
              { label: '3. 서론/본론/결론 챕터 집필', path: '/draft', tag: 'Draft' },
              { label: '4. 최종 완성 전 AI 문맥 교정', path: '/final-check', tag: 'AI Check' }
            ].map(item => (
              <div 
                key={item.path} 
                onClick={() => navigate(item.path)}
                className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
              >
                <span className="text-xs font-semibold text-slate-600">{item.label}</span>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-400 font-bold">{item.tag}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Delay Penalty Reschedule Modal */}
      {showPenaltyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 max-w-sm w-full space-y-4">
            <div className="size-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="size-6 animate-bounce" />
            </div>
            
            <div className="text-center">
              <h4 className="font-bold text-slate-900 text-lg">미션 미루기 페널티 안내</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                미션이 지연되어 보증금에서 <span className="text-rose-600 font-bold">{lastPenalty.toLocaleString()}원</span>이 차감되었습니다.
              </p>
              <p className="text-[11px] text-orange-600 bg-orange-50 px-2 py-1 rounded-md mt-2 inline-block font-semibold">
                연속 완료 Streak이 0일로 리셋되었습니다.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
              <span className="block text-[11px] text-slate-400 font-bold">향후 일정 조언</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                잦은 지연은 마감 직전의 심각한 업무 중첩으로 이어집니다. 미뤄진 미션은 자동으로 데일리 플랜 마지막 날짜 및 전체 잔여 일수 속에 재분배되었습니다.
              </p>
            </div>

            <button
              onClick={() => setShowPenaltyModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-xl transition-all cursor-pointer"
            >
              내용을 확인했으며, 다시 페이스 조절하기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
