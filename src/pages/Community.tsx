import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { CommunityPost } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Award, 
  CheckCircle2, 
  Send, 
  ChevronRight, 
  Tag, 
  User as UserIcon,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function Community() {
  const { state, addPost, addReply, acceptReply } = useAppState();
  
  // Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected post detail view
  const [activePostId, setActivePostId] = useState<string | null>(null);
  
  // Textareas/Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('사회과학');
  const [newProjectType, setNewProjectType] = useState('개인 논문');
  const [newPoints, setNewPoints] = useState(100);
  const [replyText, setReplyText] = useState('');

  const activePost = state.communityPosts.find(p => p.id === activePostId);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert('제목과 내용을 모두 작성해 주세요.');
      return;
    }
    if (state.points < newPoints) {
      alert(`포인트가 부족합니다. 현재 포인트: ${state.points} P`);
      return;
    }

    addPost({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      projectType: newProjectType,
      rewardPoints: newPoints
    });

    // Reset
    setNewTitle('');
    setNewContent('');
    setNewCategory('사회과학');
    setNewProjectType('개인 논문');
    setNewPoints(100);
    setShowAddModal(false);
    alert('질문이 등록되었습니다! 리워드 포인트가 차감되었습니다.');
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activePostId) return;

    addReply(activePostId, replyText.trim());
    setReplyText('');
  };

  const handleAccept = (replyId: string) => {
    if (!activePostId) return;
    acceptReply(activePostId, replyId);
    alert('답변이 채택되었습니다! 답변자에게 포인트가 지급됩니다.');
  };

  // Categories list
  const categories = ['All', '사회과학', '인문학', '국제학', '자연과학', '공학', '예술/디자인'];

  const filteredPosts = state.communityPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">분야별 질문 커뮤니티</h2>
          <p className="text-sm text-slate-500 font-medium">
            동료 연구자들과 피드백을 교환하고, 포인트를 현상금으로 걸어 고신뢰도 통계 및 형식 피드백을 받으세요.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="size-4" />
          질문 올리기
        </button>
      </div>

      {/* Categories slider */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin select-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 border border-slate-200/60 text-slate-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Posts List Column */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search bar */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm flex items-center relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="질문 제목 또는 내용 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-transparent rounded-xl text-sm text-slate-700 outline-none placeholder-slate-400"
            />
          </div>

          {/* Post Items */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-3">
              {filteredPosts.map(post => (
                <div 
                  key={post.id}
                  onClick={() => setActivePostId(post.id)}
                  className={`p-5 bg-white border rounded-2xl cursor-pointer transition-all hover:shadow-md flex flex-col justify-between gap-4 ${
                    activePostId === post.id 
                      ? 'border-indigo-600 ring-1 ring-indigo-600' 
                      : 'border-slate-100 hover:border-indigo-100/50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                        {post.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {post.projectType}
                      </span>
                      
                      <div className="ml-auto flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        <Award className="size-3" />
                        {post.rewardPoints} P
                      </div>
                    </div>

                    <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[11px] text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-400">
                        답변 {post.repliesCount}개
                      </span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge type="trust-tag" value={post.trustTag} />
                      {post.resolved ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">채택완료</span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">답변 대기</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="검색 조건에 맞는 질문이 없습니다"
              description="새로운 전공 질문을 등록해 동료 및 대학원 연구자들에게 해결책을 얻어보세요."
              icon={MessageSquare}
              actionLabel="새 질문 등록하기"
              onAction={() => setShowAddModal(true)}
            />
          )}

        </div>

        {/* Post Detail View Column (Col 1) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 max-h-[85vh] overflow-y-auto">
          {activePost ? (
            <div className="space-y-5">
              
              {/* Question Header */}
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">{activePost.category} • {activePost.projectType}</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    <Award className="size-3" />
                    {activePost.rewardPoints} P
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                  {activePost.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-3.5 rounded-2xl border border-slate-200/30 whitespace-pre-line">
                  {activePost.content}
                </p>
                
                <div className="flex items-center gap-2 pt-1">
                  <StatusBadge type="trust-tag" value={activePost.trustTag} />
                  {activePost.resolved && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      해결 완료
                    </span>
                  )}
                </div>
              </div>

              {/* Replies list */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  답변 피드백 ({activePost.replies.length})
                </h4>

                {activePost.replies.length > 0 ? (
                  <div className="space-y-3">
                    {activePost.replies.map(reply => (
                      <div 
                        key={reply.id} 
                        className={`p-3.5 rounded-2xl border text-xs space-y-2.5 transition-all ${
                          reply.accepted 
                            ? 'bg-emerald-50/20 border-emerald-200' 
                            : 'bg-slate-50/50 border-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-6 bg-slate-200 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-slate-500">
                              {reply.author[0]}
                            </div>
                            <div>
                              <span className="font-bold text-slate-700 block">{reply.author}</span>
                              <span className="text-[9px] text-slate-400">{reply.authorLevel}</span>
                            </div>
                          </div>

                          {reply.accepted && (
                            <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                              채택된 답변
                            </span>
                          )}
                        </div>

                        <p className="text-slate-600 leading-relaxed font-medium">
                          {reply.content}
                        </p>

                        {/* Accept Button logic */}
                        {!activePost.resolved && (
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => handleAccept(reply.id)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-0.5 cursor-pointer shadow-sm"
                            >
                              <CheckCircle2 className="size-3" />
                              답변 채택 (+{activePost.rewardPoints} P 지급)
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 text-center py-6">
                    아직 등록된 답변이 없습니다. 첫 번째 답변을 작성해 보세요.
                  </p>
                )}
              </div>

              {/* Submit Reply Form */}
              <form onSubmit={handleAddReply} className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">답변 및 피드백 작성</label>
                <div className="relative">
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="여기에 학술적 이론 및 방법론 근거를 기반으로 세부 답변을 입력하세요..."
                    rows={3}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600 resize-none pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-2.5 bottom-2.5 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="size-3.5" />
                  </button>
                </div>
              </form>

            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center text-slate-400 select-none">
              <MessageSquare className="size-8 text-slate-300 mb-2" />
              <p className="text-xs font-semibold">게시글을 클릭하면 세부 답변 내용 및 채택 창이 활성화됩니다.</p>
            </div>
          )}
        </div>

      </div>

      {/* Ask Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-50">
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-1.5">
                <MessageSquare className="size-5 text-indigo-600" />
                새 연구 질문 등록
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">닫기</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">연구 전공 분야</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    {categories.slice(1).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">과제 유형</label>
                  <select
                    value={newProjectType}
                    onChange={e => setNewProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    {['개인 논문', '레포트', '연구보고서', '팀플 보고서'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">질문 제목 *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="예: 회귀계수 통계값 해석 중 다중공선성(VIF) 지수 기준 질문"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">상세 내용 *</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="답변자들이 이해할 수 있도록 현재 논리의 가설, 변수 설정, 통계 프로그램 돌린 후의 에러 내용 등을 자세히 적어주세요."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">제공할 리워드 포인트</label>
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 150, 200].map(pts => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => setNewPoints(pts)}
                      className={`py-2 px-3 border rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                        newPoints === pts
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                          : 'border-slate-200 text-slate-500 bg-white'
                      }`}
                    >
                      {pts} P
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  * 질문 등록 시 현재 포인트에서 설정한 보상 포인트가 사전 공제되며, 채택 시 해당 답변자에게 실시간 충전됩니다. (현재 잔여: {state.points} P)
                </p>
              </div>

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
                  질문 게시하기
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
