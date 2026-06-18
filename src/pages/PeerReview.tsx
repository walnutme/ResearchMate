import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { PeerReview as PeerReviewType } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import { 
  Users, 
  FileText, 
  Star, 
  Plus, 
  CheckCircle, 
  FileCheck2, 
  MessageSquare,
  AlertTriangle,
  Award,
  Link2,
  ChevronRight
} from 'lucide-react';

export default function PeerReview() {
  const { state, addPeerReview } = useAppState();
  const navigate = useNavigate();
  
  // Tab states: 'write' | 'received' | 'sent'
  const [activeTab, setActiveTab] = useState<'write' | 'received' | 'sent'>('write');

  if (!state.project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50/50 rounded-3xl p-8 border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-sm">
          <Users className="size-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">진행 중인 연구 과제가 없습니다.</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            연구 과제를 등록하시면 동료들과 피어 리뷰를 주고받으며 연구 완성도를 실시간으로 모니터링할 수 있습니다.
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

  // Review Form States
  const [logicalValidity, setLogicalValidity] = useState(4);
  const [sourceRelevance, setSourceRelevance] = useState(4);
  const [academicFormatting, setAcademicFormatting] = useState(4);
  const [comments, setComments] = useState('');
  const [hasReferenceLink, setHasReferenceLink] = useState(false);
  const [referenceUrl, setReferenceUrl] = useState('');

  // Sample peer draft to review
  const peerDraftText = `최근 고등교육 현장에서 생성형 AI(예: ChatGPT, Claude 등)의 도입은 학습 환경의 근본적 패러다임 변화를 촉발하고 있습니다. 그러나 이러한 AI 도구의 적극적 수용이 학습자의 독립적 학술 글쓰기 능력 배양에 미치는 유해적 실증 결과에 대해서는 논의가 불충분합니다. 본 연구는 대형 언어 모델 활용 빈도와 학술적 논리 오류율 간의 상관관계를 통계 검증하여 학습자가 주도하는 논증 설계의 중요성을 피력하고, 인센티브 기반 피어 피드백 모델이 AI 의존도를 조절하는 메커니즘을 규명하고자 합니다.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return alert('세부 의견을 입력해 주세요.');

    // Calculate reliability tag
    // If user has 'grad' status and connects a reference link, it is 'evidence-backed'.
    // If user is undergrad, but connects link: 'evidence-backed'.
    // If no link is connected: 'experience-based' or 'needs-verification'.
    let trustTag: 'evidence-backed' | 'experience-based' | 'needs-verification' = 'experience-based';
    if (hasReferenceLink && referenceUrl.trim() !== '') {
      trustTag = 'evidence-backed';
    } else if (state.user?.level === 'undergrad') {
      trustTag = 'needs-verification';
    }

    addPeerReview({
      projectId: 'peer-project-123',
      reviewerName: state.user?.name || '나',
      reviewerLevel: state.user?.level || 'undergrad',
      logicalValidity,
      sourceRelevance,
      academicFormatting,
      comments: comments.trim(),
      trustTag,
      referenceLink: hasReferenceLink ? referenceUrl.trim() : undefined,
    });

    // Reset Form
    setLogicalValidity(4);
    setSourceRelevance(4);
    setAcademicFormatting(4);
    setComments('');
    setHasReferenceLink(false);
    setReferenceUrl('');
    
    alert('피어 리뷰가 정상 제출되었습니다! 리뷰어 보상(+150 P)이 지급되었습니다.');
    setActiveTab('sent');
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">피어 리뷰 (Peer Review)</h2>
        <p className="text-sm text-slate-500 font-medium">
          동료의 연구 초안을 루브릭을 바탕으로 피드백하고, 내 연구에 대한 정량적 다차원 검토 보고서를 확인합니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-100 pb-2 select-none">
        {[
          { id: 'write', label: '내가 작성할 피어 리뷰', count: 1 },
          { id: 'received', label: '나의 과제에 달린 리뷰', count: state.peerReviews.filter(r => r.reviewerName !== state.user?.name).length },
          { id: 'sent', label: '내가 제출한 피어 리뷰', count: state.peerReviews.filter(r => r.reviewerName === state.user?.name).length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 pr-6 text-sm font-bold border-b-2 transition-all relative cursor-pointer ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {tab.label}
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">
                {tab.count}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT: Write review */}
      {activeTab === 'write' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Peer Draft Box */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-50">
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase">
                배정된 피어 과제 초안
              </span>
              <span className="text-xs font-semibold text-slate-400">과제명: 생성형 AI가 대학 학술 글쓰기에 미치는 영향</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                  김
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 block">김철수 연구자</span>
                  <span className="text-[9px] text-slate-400">사회과학 전공 • 학부 연구생</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line font-medium">
                {peerDraftText}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-[10px] text-slate-400 leading-normal flex items-start gap-1.5">
              <AlertTriangle className="size-4 text-indigo-500 shrink-0" />
              <span>
                상대방의 개인 정보나 세부 전공 기밀을 보호해 주세요. 학술적 발전을 돕기 위한 객관적 근거에 기반한 조언을 남겨주시면 리워드 보상이 상승합니다.
              </span>
            </div>
          </div>

          {/* Rubric Form Box */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
              <FileCheck2 className="size-4.5 text-indigo-600" />
              루브릭 평가 양식 작성
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Score 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>1. 논리적 타당성 (Logical Validity)</span>
                  <span className="text-indigo-600">{logicalValidity}점 / 5점</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={logicalValidity}
                  onChange={e => setLogicalValidity(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Score 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>2. 연구 자료 적합성 (Source Relevance)</span>
                  <span className="text-indigo-600">{sourceRelevance}점 / 5점</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={sourceRelevance}
                  onChange={e => setSourceRelevance(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Score 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>3. 학술 서식 준수 (Academic Formatting)</span>
                  <span className="text-indigo-600">{academicFormatting}점 / 5점</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={academicFormatting}
                  onChange={e => setAcademicFormatting(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* DOI/Url Link Check */}
              <div className="p-3 bg-slate-50 rounded-2xl space-y-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={hasReferenceLink}
                    onChange={e => setHasReferenceLink(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>근거 연구자료 링크/DOI 첨부하기 (신뢰도 등급 UP)</span>
                </label>

                {hasReferenceLink && (
                  <input
                    type="text"
                    required
                    value={referenceUrl}
                    onChange={e => setReferenceUrl(e.target.value)}
                    placeholder="예: https://doi.org/10.1234/jkse..."
                    className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-xs outline-none focus:border-indigo-600"
                  />
                )}
              </div>

              {/* Comments Textarea */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">4. 세부 피드백 의견 *</label>
                <textarea
                  required
                  rows={4}
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="단순히 '좋다'는 평 대신, 구체적인 방법론적 비판이나 개선 제안을 최소 30자 이상 작성해 주세요."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Award className="size-4" />
                피어 리뷰 제출하고 보상 포인트 받기 (+150 P)
              </button>

            </form>
          </div>

        </div>
      )}

      {/* TAB CONTENT: Received reviews */}
      {activeTab === 'received' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.peerReviews.filter(r => r.reviewerName !== state.user?.name).length > 0 ? (
            state.peerReviews
              .filter(r => r.reviewerName !== state.user?.name)
              .map(review => {
                // Calculate average rubric score
                const avg = ((review.logicalValidity + review.sourceRelevance + review.academicFormatting) / 3).toFixed(1);
                
                // Show rating name
                const isGold = review.reviewerLevel === 'grad' || review.trustTag === 'evidence-backed';
                
                return (
                  <div key={review.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-500">
                          {review.reviewerName[0]}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-700 block">{review.reviewerName}</span>
                          <span className="text-[9px] text-slate-400">
                            {review.reviewerLevel === 'undergrad' ? '학부생' : review.reviewerLevel === 'undergrad_researcher' ? '학부 연구생' : '대학원생'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          isGold ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-600 border border-slate-200'
                        }`}>
                          신뢰도: {isGold ? 'Gold 등급' : 'Silver 등급'}
                        </span>
                      </div>
                    </div>

                    {/* Scores rubrics grid */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl text-center text-xs">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold mb-0.5">논리 타당</span>
                        <span className="font-bold text-slate-700">{review.logicalValidity} / 5</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold mb-0.5">자료 적합</span>
                        <span className="font-bold text-slate-700">{review.sourceRelevance} / 5</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold mb-0.5">서식 준수</span>
                        <span className="font-bold text-slate-700">{review.academicFormatting} / 5</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed font-medium bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      {review.comments}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <StatusBadge type="trust-tag" value={review.trustTag} />
                      
                      {review.referenceLink && (
                        <a 
                          href={review.referenceLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-0.5"
                        >
                          <Link2 className="size-3" />
                          첨부 근거 논문
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="col-span-2">
              <EmptyState
                title="아직 나에게 제출된 피어 리뷰가 없습니다"
                description="내가 작성 중인 초안의 완성도가 올라가거나, 질문을 올리면 동료들이 꼼꼼한 루브릭 리뷰를 제공할 예정입니다."
                icon={Users}
              />
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Sent reviews */}
      {activeTab === 'sent' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.peerReviews.filter(r => r.reviewerName === state.user?.name).length > 0 ? (
            state.peerReviews
              .filter(r => r.reviewerName === state.user?.name)
              .map(review => {
                const isGold = review.reviewerLevel === 'grad' || review.trustTag === 'evidence-backed';

                return (
                  <div key={review.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                      <span className="text-xs font-bold text-slate-400">대상: 피어 프로젝트</span>
                      <StatusBadge type="trust-tag" value={review.trustTag} />
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl text-center text-xs">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold mb-0.5">논리 타당</span>
                        <span className="font-bold text-slate-700">{review.logicalValidity} / 5</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold mb-0.5">자료 적합</span>
                        <span className="font-bold text-slate-700">{review.sourceRelevance} / 5</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-bold mb-0.5">서식 준수</span>
                        <span className="font-bold text-slate-700">{review.academicFormatting} / 5</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed font-medium bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      {review.comments}
                    </p>

                    {review.referenceLink && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Link2 className="size-3 text-indigo-500" />
                        첨부된 링크: {review.referenceLink}
                      </span>
                    )}
                  </div>
                );
              })
          ) : (
            <div className="col-span-2">
              <EmptyState
                title="내가 작성한 피어 리뷰가 없습니다"
                description="다른 연구자의 글에 꼼꼼한 루브릭 의견을 남겨주시면 +150포인트가 바로 보충됩니다!"
                icon={Users}
                actionLabel="피어 리뷰 작성하러 가기"
                onAction={() => setActiveTab('write')}
              />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
