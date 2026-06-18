import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { Mission, MissionType } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import { generateMissions } from '../lib/missionGenerator';
import { 
  Calendar, 
  Check, 
  Clock, 
  AlertOctagon, 
  RefreshCw, 
  Edit3, 
  Plus, 
  TrendingUp, 
  Sparkles,
  Info,
  ChevronRight,
  Play,
  AlertCircle,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function DailyPlan() {
  const { state, completeMission, delayMission, replanMissions } = useAppState();
  const navigate = useNavigate();
  
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editDuration, setEditDuration] = useState(30);

  // Check if 2 or more missions are delayed
  const delayedMissions = state.missions.filter(m => m.status === 'delayed');
  const hasEmergency = delayedMissions.length >= 2;

  // Open emergency modal automatically if hasEmergency is true (and user hasn't dismissed it yet)
  useEffect(() => {
    if (hasEmergency) {
      setShowEmergencyModal(true);
    }
  }, [hasEmergency]);

  const handleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    completeMission(id);
    alert('🎉 미션을 성공적으로 완료했습니다! +100포인트를 획득했습니다.');
  };

  const handleDelay = (id: string, progress: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Calculate Delay Penalty
    let delayPenalty = 500;
    if (progress >= 71) {
      delayPenalty = 0;
    } else if (progress >= 21) {
      delayPenalty = 250;
    }

    const confirmMsg = progress >= 71 
      ? '진행률이 71% 이상이므로 벌금 없이 미션을 하루 미룰 수 있습니다. 연기하시겠습니까?'
      : `미션을 하루 미루시겠습니까?\n현재 진행률: ${progress}%\n차감 벌금: ${delayPenalty}원`;

    if (window.confirm(confirmMsg)) {
      delayMission(id);
      alert(`미션이 연기되었습니다. 벌금 ${delayPenalty}원이 보증금에서 차감됩니다.`);
    }
  };

  const handleEditClick = (mission: Mission, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingMission(mission);
    setEditTitle(mission.title);
    setEditAmount(mission.targetAmount || mission.amount);
    setEditDuration(mission.estimatedMinutes || mission.duration);
  };

  const handleSaveEdit = () => {
    if (!editingMission) return;
    const updated = state.missions.map(m => 
      m.id === editingMission.id 
        ? { 
            ...m, 
            title: editTitle, 
            amount: editAmount, 
            targetAmount: editAmount, 
            duration: editDuration, 
            estimatedMinutes: editDuration 
          } 
        : m
    );
    replanMissions(updated);
    setEditingMission(null);
  };

  // Emergency Plan Redistributor
  const triggerRedistribute = (type: 'redistribute' | 'minimal') => {
    if (!state.project) return;

    if (type === 'minimal') {
      const updatedProject = { ...state.project, selectedPlan: 'minimal' as const };
      const newMissions = generateMissions(updatedProject);
      replanMissions(newMissions);
      alert('과제가 현실적인 최소 목표 플랜으로 재조정되었습니다!');
    } else {
      const today = new Date();
      let pendingIndex = 0;
      const redistributed = state.missions.map(m => {
        if (m.status === 'delayed') {
          const newDate = format(addDays(today, pendingIndex++), 'yyyy-MM-dd');
          return {
            ...m,
            status: 'pending' as const,
            date: newDate,
            duration: Math.round((m.estimatedMinutes || m.duration) * 1.1),
            estimatedMinutes: Math.round((m.estimatedMinutes || m.duration) * 1.1)
          };
        }
        return m;
      });
      replanMissions(redistributed);
      alert('밀린 미션이 오늘부터 균등하게 재분배되었습니다. (시간 10% 상향)');
    }
    setShowEmergencyModal(false);
  };

  if (!state.project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50/50 rounded-3xl p-8 border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-sm">
          <Calendar className="size-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">진행 중인 연구 과제가 없습니다.</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            연구 과제를 등록하시면 마일스톤에 맞춘 일별 미션 리스트와 실시간 집필 워크스페이스가 활성화됩니다.
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">데일리 플랜</h2>
          <p className="text-sm text-slate-500 font-medium">단순 할 일이 아닌 실제 연구 입력 공간으로 진입하는 워크스페이스 플랜입니다.</p>
        </div>
        
        {hasEmergency && (
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 animate-pulse cursor-pointer transition-colors"
          >
            <AlertOctagon className="size-4" />
            긴급 일정 재조정 필요!
          </button>
        )}
      </div>

      {/* Overview stats */}
      <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Info className="size-5 text-indigo-600 shrink-0" />
          <span className="text-xs text-indigo-950 font-semibold">
            현재 플랜: <span className="text-indigo-700 font-extrabold">{state.project?.selectedPlan === 'minimal' ? '현실적인 최소 목표 플랜' : '완성도 높은 집중 플랜'}</span>
            {state.project?.selectedPlan === 'minimal' && ' (핵심 위주 단기 작성 집중)'}
          </span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-slate-600 bg-white border px-3 py-1.5 rounded-xl">
            총 {state.missions.length}개 미션
          </span>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-xl">
            밀린 미션 {delayedMissions.length}개
          </span>
        </div>
      </div>

      {/* Main Layout: Desktop Table/Timeline, Mobile Card List */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Desktop Table view (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-xs font-bold text-slate-400 border-b border-slate-100 select-none">
                <th className="py-4 px-6 w-32">일정</th>
                <th className="py-4 px-6 w-24">미션 유형</th>
                <th className="py-4 px-6">세부 미션 설명</th>
                <th className="py-4 px-6 w-40">작성 진행률</th>
                <th className="py-4 px-6 w-28">완료 기준</th>
                <th className="py-4 px-6 w-28">예상 시간</th>
                <th className="py-4 px-6 w-28">상태</th>
                <th className="py-4 px-6 w-44 text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {state.missions.map(mission => {
                const progressVal = mission.progress || 0;
                
                // Calculate Delay Penalty description
                let penaltyText = '';
                if (mission.status === 'delayed') {
                  if (progressVal >= 71) penaltyText = '벌금 면제';
                  else if (progressVal >= 21) penaltyText = '벌금 250원 차감';
                  else penaltyText = '벌금 500원 차감';
                }

                return (
                  <tr 
                    key={mission.id} 
                    onClick={() => navigate(`/plan/${mission.id}`)}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-bold text-slate-500 text-xs whitespace-nowrap">
                      {mission.date}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <StatusBadge type="mission-type" value={mission.type} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {mission.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                        목표: {mission.targetAmount || mission.amount}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col gap-1 w-32">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                          <span>{progressVal}%</span>
                          <span className="text-[9px] font-medium text-slate-400">자동저장</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                          <div 
                            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                            style={{ width: `${progressVal}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {progressVal === 100 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <FileCheck className="size-4 shrink-0" />
                          충족 완료
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
                          <Info className="size-4 shrink-0" />
                          미달
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-semibold whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {mission.estimatedMinutes || mission.duration}분
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        <StatusBadge type="mission-status" value={mission.status} />
                        {mission.status === 'delayed' && (
                          <span className="text-[9px] font-extrabold text-rose-500">{penaltyText}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      {mission.status === 'readyToComplete' && (
                        <button
                          onClick={(e) => handleComplete(mission.id, e)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors shadow-sm"
                        >
                          완료 처리
                        </button>
                      )}
                      
                      {mission.status !== 'completed' && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/plan/${mission.id}`);
                            }}
                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                          >
                            작업하기
                          </button>
                          <button
                            onClick={(e) => handleDelay(mission.id, progressVal, e)}
                            className="bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-semibold text-xs px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                          >
                            미루기
                          </button>
                        </>
                      )}

                      {mission.status === 'completed' && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 px-2 py-1">
                          <CheckCircle2 className="size-4" />
                          최종 완료
                        </span>
                      )}
                      
                      <button
                        onClick={(e) => handleEditClick(mission, e)}
                        className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
                        title="수정"
                      >
                        <Edit3 className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List (hidden on desktop) */}
        <div className="md:hidden divide-y divide-slate-100">
          {state.missions.map(mission => {
            const progressVal = mission.progress || 0;
            
            return (
              <div 
                key={mission.id} 
                onClick={() => navigate(`/plan/${mission.id}`)}
                className="p-4 space-y-3 hover:bg-slate-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{mission.date}</span>
                  <div className="flex items-center gap-1.5">
                    <StatusBadge type="mission-status" value={mission.status} />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex gap-1.5 items-center">
                    <StatusBadge type="mission-type" value={mission.type} />
                    <span className="text-[10px] text-slate-400 font-bold">약 {mission.estimatedMinutes || mission.duration}분</span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm leading-snug">{mission.title}</h4>
                </div>

                {/* Progress bar info */}
                <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold">작성 진행률:</span>
                    <span className="font-bold text-indigo-600">{progressVal}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressVal}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">완료 기준:</span>
                    <span className={`font-bold ${progressVal === 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {progressVal === 100 ? '충족 완료' : '미달'}
                    </span>
                  </div>
                  {mission.status === 'delayed' && (
                    <div className="text-[10px] text-rose-500 font-bold pt-1 border-t border-slate-100 flex items-center gap-1">
                      <AlertCircle className="size-3.5" />
                      지연 벌금 차감 대상 (진행에 따라 감면)
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-1.5 justify-end">
                  {mission.status === 'readyToComplete' && (
                    <button
                      onClick={(e) => handleComplete(mission.id, e)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-lg cursor-pointer"
                    >
                      완료 처리
                    </button>
                  )}
                  {mission.status !== 'completed' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/plan/${mission.id}`);
                        }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 rounded-lg cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Play className="size-3" />
                        작업하기
                      </button>
                      <button
                        onClick={(e) => handleDelay(mission.id, progressVal, e)}
                        className="flex-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-xs py-2 rounded-lg cursor-pointer"
                      >
                        미루기
                      </button>
                    </>
                  )}
                  {mission.status === 'completed' && (
                    <div className="w-full text-center text-xs font-bold text-emerald-600 bg-emerald-50 py-2 rounded-lg flex items-center justify-center gap-1">
                      <CheckCircle2 className="size-4" />
                      최종 완료됨
                    </div>
                  )}
                  <button
                    onClick={(e) => handleEditClick(mission, e)}
                    className="px-3 border border-slate-200 text-slate-500 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <Edit3 className="size-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Edit Mission Modal */}
      {editingMission && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-slate-800 text-base">미션 세부 조정</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">미션 제목</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">목표 작성 분량</label>
                <input
                  type="text"
                  value={editAmount}
                  onChange={e => setEditAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">예상 시간 (분)</label>
                <input
                  type="number"
                  value={editDuration}
                  onChange={e => setEditDuration(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setEditingMission(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Plan Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-6">
            
            <div className="text-center space-y-2">
              <div className="size-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertOctagon className="size-8" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-xl tracking-tight">🚨 Emergency Plan (긴급 구제 플랜)</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                현재 2개 이상의 미션이 밀려 마감 벼락치기의 위험이 매우 큽니다. 잔여 기간과 목표치를 기반으로 일정을 즉시 재구조화해야 합니다.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Option 1 */}
              <div
                onClick={() => triggerRedistribute('redistribute')}
                className="p-4 border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/50 rounded-2xl cursor-pointer transition-all flex items-start gap-3.5"
              >
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl mt-0.5">
                  <RefreshCw className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">균등 재분배 (시간 조정)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    밀린 미션을 오늘부터 마감일까지 한 조각씩 재분배합니다. 미완성 잔여 일정이 늘어나므로 일일 권장 집필 시간이 약 10% 증가합니다.
                  </p>
                </div>
              </div>

              {/* Option 2 */}
              <div
                onClick={() => triggerRedistribute('minimal')}
                className="p-4 border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/50 rounded-2xl cursor-pointer transition-all flex items-start gap-3.5"
              >
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl mt-0.5">
                  <TrendingUp className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">현실적인 최소 플랜으로 축소</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    A+ 퀄리티 대신 마감 통과를 목표로 하는 "최소 목표 플랜"으로 남은 미션 구성을 전면 개편합니다. 남은 목표와 분량을 최소화하여 부담을 덜어줍니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-4 py-2 cursor-pointer"
              >
                나중에 조정할래요
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
