import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { Source } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import { 
  Search, 
  Plus, 
  Trash2, 
  BookOpen, 
  Link2, 
  Tag, 
  CheckCircle, 
  AlertCircle,
  FileText,
  ChevronRight
} from 'lucide-react';

export default function Sources() {
  const { state, addSource, deleteSource } = useAppState();
  const navigate = useNavigate();

  if (!state.project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50/50 rounded-3xl p-8 border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-sm">
          <BookOpen className="size-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">진행 중인 연구 과제가 없습니다.</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            연구 과제를 등록하시면 분석하려는 참고 문헌, 선행 연구 자료의 핵심 내용 및 인용 정보를 체계적으로 관리할 수 있습니다.
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
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [mainClaim, setMainClaim] = useState('');
  const [quotation, setQuotation] = useState('');
  const [doiOrUrl, setDoiOrUrl] = useState('');
  const [keywordsText, setKeywordsText] = useState('');
  const [section, setSection] = useState<'intro' | 'body' | 'conclusion'>('body');

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !year.trim()) {
      alert('제목, 저자, 연도는 필수 입력 항목입니다.');
      return;
    }

    const keywords = keywordsText
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    addSource({
      title: title.trim(),
      author: author.trim(),
      year: year.trim(),
      mainClaim: mainClaim.trim(),
      quotation: quotation.trim(),
      doiOrUrl: doiOrUrl.trim() || undefined,
      keywords,
      section,
    });

    // Reset form
    setTitle('');
    setAuthor('');
    setYear('');
    setMainClaim('');
    setQuotation('');
    setDoiOrUrl('');
    setKeywordsText('');
    setSection('body');
    setShowAddModal(false);
  };

  // Filter sources
  const filteredSources = state.sources.filter(source => {
    const matchesSearch = 
      source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSection = selectedSection === 'all' || source.section === selectedSection;

    return matchesSearch && matchesSection;
  });

  return (
    <div className="space-y-6">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">자료 및 출처 정리</h2>
          <p className="text-sm text-slate-500">
            연구에 활용할 논문, 도서, 사료의 핵심 구절과 인용 데이터를 관리합니다.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="size-4" />
          자료 추가하기
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="자료 제목, 저자, 키워드 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm text-slate-700 transition-all placeholder-slate-400"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'intro', 'body', 'conclusion'].map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-4 py-2.5 border rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                selectedSection === sec
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
              }`}
            >
              {sec === 'all' && '전체 보기'}
              {sec === 'intro' && '서론 사용'}
              {sec === 'body' && '본론 사용'}
              {sec === 'conclusion' && '결론 사용'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty view */}
      {filteredSources.length > 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-xs font-bold text-slate-400 border-b border-slate-100">
                  <th className="py-4 px-6 w-1/4">자료 정보</th>
                  <th className="py-4 px-6 w-1/5">핵심 주장</th>
                  <th className="py-4 px-6 w-1/4">인용구/내용</th>
                  <th className="py-4 px-6 w-32">위치</th>
                  <th className="py-4 px-6 w-40">완성도 / DOI</th>
                  <th className="py-4 px-6 w-20 text-center">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {filteredSources.map(source => (
                  <tr key={source.id} className="hover:bg-slate-50/20 transition-colors">
                    
                    {/* Source Info */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 text-sm hover:underline block cursor-pointer">
                          {source.title}
                        </span>
                        <div className="text-xs text-slate-500 font-semibold">
                          {source.author} ({source.year})
                        </div>
                        {source.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {source.keywords.map(k => (
                              <span key={k} className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-slate-50 border border-slate-200/50 rounded-full text-[10px] text-slate-500 font-medium">
                                <Tag className="size-2 text-slate-400" />
                                {k}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Main Claim */}
                    <td className="py-4 px-6 text-slate-600 leading-relaxed font-medium text-xs">
                      {source.mainClaim || '-'}
                    </td>

                    {/* Citation quote */}
                    <td className="py-4 px-6">
                      {source.quotation ? (
                        <blockquote className="border-l-2 border-slate-200 pl-2 text-slate-500 italic text-xs leading-relaxed">
                          "{source.quotation}"
                        </blockquote>
                      ) : (
                        <span className="text-slate-400 text-xs italic">입력된 문장이 없습니다.</span>
                      )}
                    </td>

                    {/* Section */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                        source.section === 'intro' ? 'bg-sky-50 text-sky-700' :
                        source.section === 'body' ? 'bg-indigo-50 text-indigo-700' :
                        'bg-violet-50 text-violet-700'
                      }`}>
                        {source.section === 'intro' ? '서론' :
                         source.section === 'body' ? '본론' : '결론'}
                      </span>
                    </td>

                    {/* DOI & Completeness */}
                    <td className="py-4 px-6 space-y-1.5 whitespace-nowrap">
                      <div>
                        <StatusBadge type="completeness" value={String(source.completeness)} />
                      </div>
                      
                      {source.doiOrUrl ? (
                        <a 
                          href={source.doiOrUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-0.5"
                        >
                          <Link2 className="size-3" />
                          주소 연결됨
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-red-50 border border-red-100 rounded text-[9px] text-red-600 font-extrabold animate-pulse">
                          <AlertCircle className="size-2.5" />
                          출처 정보 부족
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => deleteSource(source.id)}
                        className="text-slate-400 hover:text-rose-500 p-2 rounded-lg transition-colors cursor-pointer"
                        title="자료 삭제"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden divide-y divide-slate-100">
            {filteredSources.map(source => (
              <div key={source.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">{source.title}</h4>
                    <span className="text-xs text-slate-500 font-semibold">{source.author} ({source.year})</span>
                  </div>
                  <button
                    onClick={() => deleteSource(source.id)}
                    className="text-slate-400 hover:text-rose-500 p-2 shrink-0 cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {source.mainClaim && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                    <span className="font-bold block text-[10px] text-slate-400 mb-0.5">핵심 주장</span>
                    {source.mainClaim}
                  </p>
                )}

                {source.quotation && (
                  <blockquote className="border-l-2 border-slate-200 pl-2.5 text-xs text-slate-500 italic leading-relaxed">
                    "{source.quotation}"
                  </blockquote>
                )}

                <div className="flex flex-wrap gap-2 items-center justify-between pt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    source.section === 'intro' ? 'bg-sky-50 text-sky-700' :
                    source.section === 'body' ? 'bg-indigo-50 text-indigo-700' :
                    'bg-violet-50 text-violet-700'
                  }`}>
                    {source.section === 'intro' ? '서론 배치' :
                     source.section === 'body' ? '본론 배치' : '결론 배치'}
                  </span>

                  <div className="flex items-center gap-2">
                    <StatusBadge type="completeness" value={String(source.completeness)} />
                    {!source.doiOrUrl && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-red-50 text-[9px] text-red-600 font-extrabold border border-red-100 rounded">
                        출처 부족
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <EmptyState
          title="등록된 자료가 없습니다"
          description="연구 과제에 인용할 선행 논문이나 도서 출처 자료를 추가해 보세요. 키워드 태그로 손쉽게 논리를 엮을 수 있습니다."
          icon={BookOpen}
          actionLabel="첫 번째 자료 추가"
          onAction={() => setShowAddModal(true)}
        />
      )}

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-50">
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-1.5">
                <Plus className="size-5 text-indigo-600" />
                새 연구 자료 등록
              </h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                닫기
              </button>
            </div>

            <form onSubmit={handleAddSource} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">논문/자료 제목 *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="예: 인공지능 기반 피어 리뷰 보상 모델 연구"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">저자 *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    placeholder="예: 최현우, 김철수"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">발행 연도 *</label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="예: 2025"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">DOI 또는 웹주소 (URL)</label>
                <input
                  type="text"
                  value={doiOrUrl}
                  onChange={e => setDoiOrUrl(e.target.value)}
                  placeholder="예: https://doi.org/10.1234/jkse.2025..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">핵심 주장 (Main Claim)</label>
                <textarea
                  value={mainClaim}
                  onChange={e => setMainClaim(e.target.value)}
                  placeholder="선행 논문이 증명하려 한 주요 가설과 주장을 요약해 적습니다."
                  rows={2}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">인용할 특정 구절/문장 (Quotation)</label>
                <textarea
                  value={quotation}
                  onChange={e => setQuotation(e.target.value)}
                  placeholder="내 논문에 직접 인용구로 긁어올 문장을 그대로 옮겨 적습니다."
                  rows={2}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">관련 키워드 (쉼표 구분)</label>
                  <input
                    type="text"
                    value={keywordsText}
                    onChange={e => setKeywordsText(e.target.value)}
                    placeholder="예: 피어리뷰, 보상토큰, 신뢰도"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">사용 예정 단원</label>
                  <select
                    value={section}
                    onChange={e => setSection(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 bg-white"
                  >
                    <option value="intro">서론 (Problem setting)</option>
                    <option value="body">본론 (Analysis & Proof)</option>
                    <option value="conclusion">결론 (Summary & Future work)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
                >
                  참고문헌 등록 (+50 P)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
