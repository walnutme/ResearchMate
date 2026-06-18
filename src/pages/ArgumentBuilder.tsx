import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { ClaimNode, ClaimType } from '../types';
import EmptyState from '../components/common/EmptyState';
import { 
  GitCommit, 
  Plus, 
  Trash2, 
  Link2, 
  Network, 
  AlertCircle, 
  CheckCircle,
  HelpCircle,
  FileText,
  ChevronRight
} from 'lucide-react';

export default function ArgumentBuilder() {
  const { state, addClaim, deleteClaim } = useAppState();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  if (!state.project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50/50 rounded-3xl p-8 border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-sm">
          <Network className="size-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">진행 중인 연구 과제가 없습니다.</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            연구 과제를 등록하시면 논리적 연관성을 분석하고 반론/재반박 구조를 한눈에 가시화하는 캔버스 도구가 제공됩니다.
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

  // Form states
  const [claimType, setClaimType] = useState<ClaimType>('claim');
  const [text, setText] = useState('');
  const [connectedTo, setConnectedTo] = useState('');
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);

  const handleAddClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return alert('내용을 입력해 주세요.');

    addClaim({
      type: claimType,
      text: text.trim(),
      connectedTo: connectedTo || undefined,
      sourceIds: selectedSourceIds.length > 0 ? selectedSourceIds : undefined,
    });

    // Reset form
    setText('');
    setConnectedTo('');
    setSelectedSourceIds([]);
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    deleteClaim(id);
  };

  // Group nodes
  const mainClaims = state.claims.filter(c => c.type === 'claim');
  const evidences = state.claims.filter(c => c.type === 'evidence');
  const counters = state.claims.filter(c => c.type === 'counter');
  const rebuttals = state.claims.filter(c => c.type === 'rebuttal');

  // Logic checklist calculations
  const hasClaims = mainClaims.length > 0;
  
  const everyClaimHasEvidence = hasClaims && mainClaims.every(claim => 
    evidences.some(ev => ev.connectedTo === claim.id)
  );

  const hasCounterargument = counters.length > 0;

  const everyCounterHasRebuttal = hasCounterargument && counters.every(counter => 
    rebuttals.some(reb => reb.connectedTo === counter.id)
  );

  const sourcesConnected = state.claims.some(c => c.sourceIds && c.sourceIds.length > 0);

  // Calculate completeness percentage
  let completeness = 0;
  if (hasClaims) completeness += 25;
  if (everyClaimHasEvidence) completeness += 25;
  if (hasCounterargument) completeness += 25;
  if (everyCounterHasRebuttal) completeness += 25;

  return (
    <div className="space-y-6">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">주장 & 근거 빌더 (Argument Builder)</h2>
          <p className="text-sm text-slate-500">
            글의 핵심 논점을 가시화하고 반론 및 재반박 구조를 설계하여 아규먼트의 허점을 보완합니다.
          </p>
        </div>
        <button
          onClick={() => {
            setClaimType('claim');
            setShowAddModal(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="size-4" />
          논리 노드 추가
        </button>
      </div>

      {/* Checklist & Score Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Progress Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between select-none">
          <div>
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider">LOGICAL STRUCTURE</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{completeness}%</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                {completeness === 100 ? '논증 완벽' : '논증 보완 중'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              체계적인 아규먼트 노드 구성을 완성할 때마다 완성도가 상승합니다.
            </p>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-6">
            <div 
              className="bg-indigo-600 h-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm md:col-span-2 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <CheckCircle className="size-4.5 text-indigo-600" />
            논리 검증 체크리스트
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            
            {/* Rule 1 */}
            <div className="flex items-start gap-2.5">
              {everyClaimHasEvidence ? (
                <div className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full shrink-0 mt-0.5">
                  <CheckCircle className="size-4" />
                </div>
              ) : (
                <div className="p-0.5 bg-slate-50 text-slate-300 rounded-full shrink-0 mt-0.5">
                  <CheckCircle className="size-4" />
                </div>
              )}
              <div>
                <h4 className={`text-xs font-bold ${everyClaimHasEvidence ? 'text-slate-700' : 'text-slate-400'}`}>주장마다 연결된 근거가 있는가?</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">모든 Claim 노드에 연결된 Evidence 노드가 최소 1개 필요합니다.</p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="flex items-start gap-2.5">
              {hasCounterargument ? (
                <div className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full shrink-0 mt-0.5">
                  <CheckCircle className="size-4" />
                </div>
              ) : (
                <div className="p-0.5 bg-slate-50 text-slate-300 rounded-full shrink-0 mt-0.5">
                  <CheckCircle className="size-4" />
                </div>
              )}
              <div>
                <h4 className={`text-xs font-bold ${hasCounterargument ? 'text-slate-700' : 'text-slate-400'}`}>예상 반론(Counter)이 존재하는가?</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">상대 진영 혹은 타당한 반박 노드가 최소 1개 이상 존재해야 합니다.</p>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="flex items-start gap-2.5">
              {everyCounterHasRebuttal ? (
                <div className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full shrink-0 mt-0.5">
                  <CheckCircle className="size-4" />
                </div>
              ) : (
                <div className="p-0.5 bg-slate-50 text-slate-300 rounded-full shrink-0 mt-0.5">
                  <CheckCircle className="size-4" />
                </div>
              )}
              <div>
                <h4 className={`text-xs font-bold ${everyCounterHasRebuttal ? 'text-slate-700' : 'text-slate-400'}`}>반론에 대한 재반박이 마련되었는가?</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">제시한 모든 반론에 대응하는 Rebuttal 노드가 존재해야 합니다.</p>
              </div>
            </div>

            {/* Rule 4 */}
            <div className="flex items-start gap-2.5">
              {sourcesConnected ? (
                <div className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full shrink-0 mt-0.5">
                  <CheckCircle className="size-4" />
                </div>
              ) : (
                <div className="p-0.5 bg-slate-50 text-slate-300 rounded-full shrink-0 mt-0.5">
                  <CheckCircle className="size-4" />
                </div>
              )}
              <div>
                <h4 className={`text-xs font-bold ${sourcesConnected ? 'text-slate-700' : 'text-slate-400'}`}>실제 참고 문헌 출처가 연결되어 있는가?</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">증거 및 재반박 카드에 수집한 선행 연구 논문이 엮여 있어야 합니다.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Visual Logic Board */}
      {mainClaims.length > 0 ? (
        <div className="space-y-6">
          {mainClaims.map(claim => {
            const claimEvidences = evidences.filter(e => e.connectedTo === claim.id);
            const claimCounters = counters.filter(c => c.connectedTo === claim.id);

            return (
              <div 
                key={claim.id}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Main Claim Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                      핵심 주장 (Main Claim)
                    </span>
                    <h3 className="text-base font-extrabold text-slate-800 leading-snug">{claim.text}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(claim.id)}
                    className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg shrink-0 transition-colors"
                    title="주장 삭제"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {/* Connected Children Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  
                  {/* Evidences column */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">실증적 근거 (Evidence)</span>
                      <button
                        onClick={() => {
                          setClaimType('evidence');
                          setConnectedTo(claim.id);
                          setShowAddModal(true);
                        }}
                        className="text-[11px] text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-0.5 cursor-pointer"
                      >
                        <Plus className="size-3" />
                        근거 추가
                      </button>
                    </div>

                    {claimEvidences.length > 0 ? (
                      claimEvidences.map(ev => (
                        <div key={ev.id} className="p-4 bg-emerald-50/20 border border-emerald-100/50 rounded-2xl flex flex-col justify-between gap-2.5">
                          <p className="text-xs text-slate-700 leading-relaxed font-semibold">{ev.text}</p>
                          <div className="flex items-center justify-between">
                            {/* Sources links */}
                            <div className="flex items-center gap-1">
                              {ev.sourceIds && ev.sourceIds.map(srcId => {
                                const source = state.sources.find(s => s.id === srcId);
                                return source ? (
                                  <span key={srcId} className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded text-[9px] text-emerald-700 font-bold">
                                    <Link2 className="size-2.5" />
                                    {source.author.split(',')[0]} ({source.year})
                                  </span>
                                ) : null;
                              })}
                            </div>
                            <button
                              onClick={() => handleDelete(ev.id)}
                              className="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                        <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                          <AlertCircle className="size-3.5" />
                          주장에 달린 실증적 증거가 없습니다.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Counters and Rebuttals column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">예상 반론 & 재반박 (Counter & Rebuttal)</span>
                      <button
                        onClick={() => {
                          setClaimType('counter');
                          setConnectedTo(claim.id);
                          setShowAddModal(true);
                        }}
                        className="text-[11px] text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-0.5 cursor-pointer"
                      >
                        <Plus className="size-3" />
                        반론 추가
                      </button>
                    </div>

                    {claimCounters.length > 0 ? (
                      claimCounters.map(counter => {
                        const counterRebuttals = rebuttals.filter(r => r.connectedTo === counter.id);

                        return (
                          <div key={counter.id} className="space-y-2 border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                            
                            {/* Counter Card */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <span className="inline-block text-[9px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
                                  반론 (Counterargument)
                                </span>
                                <p className="text-xs text-slate-700 leading-relaxed font-semibold">{counter.text}</p>
                              </div>
                              <button
                                onClick={() => handleDelete(counter.id)}
                                className="text-slate-300 hover:text-rose-500 p-1 rounded shrink-0 transition-colors"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>

                            {/* Rebuttals child list */}
                            <div className="pl-4 border-l border-slate-200 space-y-2 pt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400">나의 재반박 (Rebuttal)</span>
                                <button
                                  onClick={() => {
                                    setClaimType('rebuttal');
                                    setConnectedTo(counter.id);
                                    setShowAddModal(true);
                                  }}
                                  className="text-[10px] text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-0.5 cursor-pointer"
                                >
                                  <Plus className="size-2.5" />
                                  재반박 추가
                                </button>
                              </div>

                              {counterRebuttals.length > 0 ? (
                                counterRebuttals.map(reb => (
                                  <div key={reb.id} className="p-3 bg-indigo-50/20 border border-indigo-100/30 rounded-xl flex flex-col gap-1.5">
                                    <p className="text-xs text-indigo-950 font-medium leading-relaxed">{reb.text}</p>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-1">
                                        {reb.sourceIds && reb.sourceIds.map(srcId => {
                                          const source = state.sources.find(s => s.id === srcId);
                                          return source ? (
                                            <span key={srcId} className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded text-[9px] text-indigo-700 font-bold">
                                              <Link2 className="size-2.5" />
                                              {source.author.split(',')[0]} ({source.year})
                                            </span>
                                          ) : null;
                                        })}
                                      </div>
                                      <button
                                        onClick={() => handleDelete(reb.id)}
                                        className="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors"
                                      >
                                        <Trash2 className="size-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="p-3 bg-red-50/20 border border-dashed border-red-200 rounded-xl text-center">
                                  <span className="text-[11px] text-red-500 font-semibold flex items-center justify-center gap-1">
                                    <AlertCircle className="size-3.5" />
                                    재반박 필요! 반론을 재반박해야 논리가 증명됩니다.
                                  </span>
                                </div>
                              )}
                            </div>

                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                        <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                          <AlertCircle className="size-3.5" />
                          제시된 예상 반론이 없습니다.
                        </span>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="설계된 논리 주장이 없습니다"
          description="연구 논문의 핵심 주장을 등록하여 구조화를 시작하세요. 이후 주장을 보강할 증거(Evidence)와 방어용 반론(Counterargument)을 추가해 갈 수 있습니다."
          icon={Network}
          actionLabel="핵심 주장(Main Claim) 추가"
          onAction={() => {
            setClaimType('claim');
            setShowAddModal(true);
          }}
        />
      )}

      {/* Add Logic Node Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-50">
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-1.5">
                <GitCommit className="size-5 text-indigo-600" />
                논증 구조 노드 추가
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">닫기</button>
            </div>

            <form onSubmit={handleAddClaim} className="space-y-4">
              
              {/* Node Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">노드 유형</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'claim', label: '핵심 주장' },
                    { id: 'evidence', label: '증거/근거' },
                    { id: 'counter', label: '예상 반론' },
                    { id: 'rebuttal', label: '재반박' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      disabled={claimType !== item.id && connectedTo !== ''} // Parent is locked in sub-actions
                      className={`py-2 px-3 border rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                        claimType === item.id
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                          : 'border-slate-200 text-slate-500 bg-white disabled:opacity-50'
                      }`}
                      onClick={() => setClaimType(item.id as ClaimType)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">내용 *</label>
                <textarea
                  required
                  rows={3}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="예: AI 표설 교정의 활용은 문장 유려함을 돕지만 학술 논리 구성의 깊이에는 Peer Review 피드백이 더 효과적이다."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Connection selector */}
              {claimType !== 'claim' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">연결할 상위 노드 *</label>
                  <select
                    required
                    value={connectedTo}
                    onChange={e => setConnectedTo(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white"
                  >
                    <option value="">-- 상위 노드를 선택하세요 --</option>
                    
                    {/* If adding evidence or counter, connect to a Main Claim */}
                    {(claimType === 'evidence' || claimType === 'counter') && 
                      mainClaims.map(c => (
                        <option key={c.id} value={c.id}>주장: {c.text.substring(0, 40)}...</option>
                      ))
                    }

                    {/* If adding rebuttal, connect to a Counter */}
                    {claimType === 'rebuttal' && 
                      counters.map(c => {
                        const parent = mainClaims.find(m => m.id === c.connectedTo);
                        return (
                          <option key={c.id} value={c.id}>
                            반론: {c.text.substring(0, 30)}... (주장: {parent?.text.substring(0, 15)}...)
                          </option>
                        );
                      })
                    }
                  </select>
                </div>
              )}

              {/* Sources link checkmarks */}
              {(claimType === 'evidence' || claimType === 'rebuttal') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">인용 참고 문헌 연계</label>
                  {state.sources.length > 0 ? (
                    <div className="max-h-32 overflow-y-auto border border-slate-100 rounded-xl p-2.5 space-y-2">
                      {state.sources.map(src => (
                        <label key={src.id} className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mt-0.5 rounded"
                            checked={selectedSourceIds.includes(src.id)}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedSourceIds([...selectedSourceIds, src.id]);
                              } else {
                                setSelectedSourceIds(selectedSourceIds.filter(id => id !== src.id));
                              }
                            }}
                          />
                          <span>{src.author} ({src.year}) - {src.title}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-rose-500 italic font-semibold">
                      * 현재 정리된 참고문헌 자료가 없습니다. 자료 탭에서 먼저 추가하고 연계해 보세요.
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  노드 저장
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
