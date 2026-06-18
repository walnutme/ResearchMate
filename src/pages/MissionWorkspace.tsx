import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { Mission, MissionType, MissionWorkspaceData } from '../types';
import { calculateMissionProgress } from '../lib/missionGenerator';
import { countWords, countCharacters } from '../lib/wordCount';
import StatusBadge from '../components/common/StatusBadge';
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Sparkles,
  PlusCircle,
  Trash2,
  ListTodo,
  Info,
  PenTool,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function MissionWorkspace() {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const { state, updateMissionWorkspace, completeMission, delayMission } = useAppState();

  const mission = state.missions.find(m => m.id === missionId);
  
  // Local workspace state
  const [workspaceData, setWorkspaceData] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showDelayConfirm, setShowDelayConfirm] = useState(false);

  // Initialize local workspace state when mission changes
  useEffect(() => {
    if (mission) {
      setWorkspaceData(JSON.parse(JSON.stringify(mission.workspaceData || {})));
    }
  }, [missionId]); // Re-run only on route change to prevent resetting user input while typing

  // Auto-save logic
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleWorkspaceChange = (newData: any) => {
    setWorkspaceData(newData);
    setSaveStatus('saving');
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      if (mission) {
        updateMissionWorkspace(mission.id, newData);
        setSaveStatus('saved');
      }
    }, 800); // 800ms debounce
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (!mission || !workspaceData) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-bold text-slate-800">미션을 찾을 수 없습니다.</h3>
        <button 
          onClick={() => navigate('/plan')}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
        >
          데일리 플랜으로 가기
        </button>
      </div>
    );
  }

  // Calculate real-time progress and errors
  const { progress, missing } = calculateMissionProgress(mission.type, workspaceData);

  // 과제 targetUnit 기반 단위 선택
  const projectTargetUnit = state.project?.targetUnit ?? 'words';
  const isMissionCharMode = projectTargetUnit === 'characters';
  const missionCountFn = isMissionCharMode ? countCharacters : countWords;
  const missionUnitLabel = isMissionCharMode ? '자' : '단어';

  // Calculate Delay Penalty
  let delayPenalty = 500;
  if (progress >= 71) {
    delayPenalty = 0;
  } else if (progress >= 21) {
    delayPenalty = 250;
  }

  const handleManualSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    updateMissionWorkspace(mission.id, workspaceData);
    setSaveStatus('saved');
    alert('작성하신 내용이 임시 저장되었습니다.');
  };

  const handleFinalSubmit = () => {
    if (progress < 100) {
      setValidationErrors(missing);
      setShowValidationAlert(true);
      return;
    }

    completeMission(mission.id);
    alert('🎉 미션을 성공적으로 완료했습니다! +100포인트를 획득했습니다.');
    navigate('/plan');
  };

  const handleConfirmDelay = () => {
    delayMission(mission.id);
    alert(`미션이 미뤄졌습니다. 보증금에서 ${delayPenalty.toLocaleString()}원이 차감됩니다.`);
    navigate('/plan');
  };

  // --- RENDERING EDITORS BY MISSION TYPE ---

  // 1. Reading Mission Editor
  const renderReadingEditor = () => {
    const notes = workspaceData.notes || [];
    const firstNote = notes[0] || { title: '', author: '', summary: '', quotation: '', relevance: '' };

    const updateField = (field: string, val: string) => {
      const updatedNotes = [...notes];
      if (updatedNotes.length === 0) {
        updatedNotes.push({ id: 'note-1', title: '', author: '', summary: '', quotation: '', relevance: '' });
      }
      updatedNotes[0] = { ...updatedNotes[0], [field]: val };
      handleWorkspaceChange({ ...workspaceData, notes: updatedNotes });
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5">읽은 자료 제목 <span className="text-rose-500">*</span></label>
            <input
              type="text"
              placeholder="예: 영미소설과 정체성 연구"
              value={firstNote.title || ''}
              onChange={e => updateField('title', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5">저자 및 출처</label>
            <input
              type="text"
              placeholder="예: John Doe (2022)"
              value={firstNote.author || ''}
              onChange={e => updateField('author', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5">
            핵심 내용 요약 <span className="text-rose-500">*</span>
            <span className="ml-2 text-[10px] font-normal text-slate-400">
              (현재 {(firstNote.summary || '').length}자 / 최소 300자)
            </span>
          </label>
          <textarea
            rows={6}
            placeholder="자료의 연구 방법, 핵심 분석 대상 및 연구 결과를 300자 이상 요약해주세요."
            value={firstNote.summary || ''}
            onChange={e => updateField('summary', e.target.value)}
            className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5">인용하고 싶은 핵심 문장</label>
          <textarea
            rows={3}
            placeholder="내 연구 논문이나 보고서에 직접 인용(Quotation)하고 싶은 주요 구절을 적어주세요."
            value={firstNote.quotation || ''}
            onChange={e => updateField('quotation', e.target.value)}
            className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5">
            내 연구 주제와의 관련성 및 적용 아이디어 <span className="text-rose-500">*</span>
            <span className="ml-2 text-[10px] font-normal text-slate-400">
              (현재 {(firstNote.relevance || '').length}자 / 최소 150자)
            </span>
          </label>
          <textarea
            rows={4}
            placeholder="이 자료가 내 주제에 어떤 시사점을 주는지, 내 글에서 어떻게 활용할 것인지 150자 이상 작성해주세요."
            value={firstNote.relevance || ''}
            onChange={e => updateField('relevance', e.target.value)}
            className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none resize-y"
          />
        </div>
      </div>
    );
  };

  // 2. Organizing Mission Editor
  const renderOrganizingEditor = () => {
    const notes = workspaceData.notes || [];

    const updateCardField = (index: number, field: string, val: string) => {
      const updatedNotes = [...notes];
      updatedNotes[index] = { ...updatedNotes[index], [field]: val };
      handleWorkspaceChange({ ...workspaceData, notes: updatedNotes });
    };

    const addCard = () => {
      const newCardId = `card-${Date.now()}`;
      const newCard = { id: newCardId, title: '', concept: '', claim: '', usage: '', doiOrUrl: '' };
      handleWorkspaceChange({ ...workspaceData, notes: [...notes, newCard] });
    };

    const removeCard = (index: number) => {
      const updatedNotes = notes.filter((_: any, idx: number) => idx !== index);
      handleWorkspaceChange({ ...workspaceData, notes: updatedNotes });
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 font-semibold">요약 카드 리스트 (최소 2개 작성 필요)</span>
          <button
            onClick={addCard}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <PlusCircle className="size-4" />
            카드 추가
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="p-8 text-center border border-dashed rounded-2xl bg-slate-50/50 text-slate-400 text-sm">
            작성된 카드가 없습니다. 상단 우측의 [카드 추가]를 눌러 작성을 시작해보세요.
          </div>
        ) : (
          <div className="space-y-6">
            {notes.map((card: any, idx: number) => (
              <div key={card.id || idx} className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm space-y-4 relative hover:border-slate-200 transition-colors">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    요약 카드 #{idx + 1}
                  </span>
                  {notes.length > 2 && (
                    <button
                      onClick={() => removeCard(idx)}
                      className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="카드 삭제"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">선행연구 제목 <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="연구 문헌의 정확한 명칭"
                      value={card.title || ''}
                      onChange={e => updateCardField(idx, 'title', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs transition-all focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">핵심 개념 / 키워드</label>
                    <input
                      type="text"
                      placeholder="예: 파편화, 기후 재정"
                      value={card.concept || ''}
                      onChange={e => updateCardField(idx, 'concept', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs transition-all focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    연구자의 핵심 주장 <span className="text-rose-500">*</span>
                    <span className="ml-1 text-[9px] font-normal text-slate-400">
                      (현재 {(card.claim || '').length}자 / 최소 100자)
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="해당 연구자가 입증해 낸 핵심 성과와 논리적 주장을 100자 이상 적어주세요."
                    value={card.claim || ''}
                    onChange={e => updateCardField(idx, 'claim', e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs transition-all focus:outline-none resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">내 글에서 활용할 위치 / 내용</label>
                    <input
                      type="text"
                      placeholder="예: 본론 2단락 기후 금융 비효율성 부분"
                      value={card.usage || ''}
                      onChange={e => updateCardField(idx, 'usage', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs transition-all focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">출처 / DOI / URL <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="예: https://doi.org/... 또는 논문 URL"
                      value={card.doiOrUrl || ''}
                      onChange={e => updateCardField(idx, 'doiOrUrl', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs transition-all focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 3. Writing Mission Editor
  const renderWritingEditor = () => {
    const sections = workspaceData.sections || { problem: '', purpose: '', question: '', draft: '' };

    const updateSection = (key: string, val: string) => {
      const updatedSections = { ...sections, [key]: val };
      handleWorkspaceChange({ ...workspaceData, sections: updatedSections });
    };

    const fullText = [
      sections.problem || '',
      sections.purpose || '',
      sections.question || '',
      sections.draft || ''
    ].join(' ');

    const totalChars = countCharacters(fullText);
    const totalWords = countWords(fullText);

    // 글자/단어 단위에 따라 표시 멘트 변경
    const displayAmount = isMissionCharMode
      ? totalChars
      : countWords([sections.problem || '', sections.purpose || '', sections.question || '', sections.draft || ''].join(' '));
    const displayUnit = isMissionCharMode ? '자' : '단어';

    return (
      <div className="space-y-5">
        <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-xl p-3.5 text-xs text-indigo-950 font-medium flex items-center justify-between">
          <span>총 글자 수 집계 (목표: 600자 이상)</span>
          <span className="font-extrabold text-indigo-700 bg-white border border-indigo-100 px-2 py-0.5 rounded-md text-sm">
            {totalChars} 자
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">1. 문제 제기 (Background/Problem Statement)</label>
            <textarea
              rows={3}
              placeholder="연구 대상의 배경 설명과 해결해야 할 본질적 연구 문제를 작성해주세요."
              value={sections.problem || ''}
              onChange={e => updateSection('problem', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">2. 연구 목적 (Research Objective)</label>
            <textarea
              rows={3}
              placeholder="본 연구가 규명해내고자 하는 목표와 학술적 가치에 관해 작성해주세요."
              value={sections.purpose || ''}
              onChange={e => updateSection('purpose', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">3. 연구 질문 (Research Question) <span className="text-rose-500">*</span></label>
            <textarea
              rows={2}
              placeholder="예: 다자간 기후기금의 파편화가 수원국 신뢰도에 미치는 영향은 무엇인가?"
              value={sections.question || ''}
              onChange={e => updateSection('question', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">4. 임시 문단 집필 영역 (Draft Area)</label>
            <textarea
              rows={6}
              placeholder="논문에 그대로 집어넣을 정식 단락 흐름을 길게 서술하여 완성해보세요."
              value={sections.draft || ''}
              onChange={e => updateSection('draft', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none resize-y"
            />
          </div>
        </div>
      </div>
    );
  };

  // 4. Revision Mission Editor
  const renderRevisionEditor = () => {
    const checklist = workspaceData.checklist || [];
    const text = workspaceData.text || '';

    const handleCheckToggle = (id: string) => {
      const updatedChecklist = checklist.map((item: any) => 
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      handleWorkspaceChange({ ...workspaceData, checklist: updatedChecklist });
    };

    const handleTextChange = (val: string) => {
      handleWorkspaceChange({ ...workspaceData, text: val });
    };

    const checkedCount = checklist.filter((item: any) => item.checked).length;
    const checkRate = checklist.length > 0 ? Math.round((checkedCount / checklist.length) * 100) : 0;

    return (
      <div className="space-y-5">
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-slate-500">필수 서식 & 논리 체크리스트 (최소 80% 이상 완료 필요)</label>
          <div className="border border-slate-100 bg-white rounded-2xl p-4 space-y-3 shadow-sm">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 border-b border-slate-50 pb-2">
              <span>진척률</span>
              <span className="text-indigo-600">{checkRate}% 완료 ({checkedCount}/{checklist.length}개)</span>
            </div>
            <div className="space-y-2">
              {checklist.map((item: any) => (
                <label 
                  key={item.id} 
                  className="flex items-start gap-3 p-2.5 hover:bg-slate-50/60 rounded-xl cursor-pointer transition-colors text-xs font-medium text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={item.checked || false}
                    onChange={() => handleCheckToggle(item.id)}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 size-4 border-slate-300"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5">
            수정/퇴고 세부 메모 작성 <span className="text-rose-500">*</span>
            <span className="ml-2 text-[10px] font-normal text-slate-400">
              (현재 {text.length}자 / 최소 200자)
            </span>
          </label>
          <textarea
            rows={6}
            placeholder="수정한 문장 비교, 서식 조정 내역, 문맥 흐름 보완 내용을 구체적인 텍스트 메모로 200자 이상 남겨주세요."
            value={text}
            onChange={e => handleTextChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm transition-all focus:outline-none resize-y"
          />
        </div>
      </div>
    );
  };

  // 5. Feedback Mission Editor
  const renderFeedbackEditor = () => {
    const sections = workspaceData.sections || { target: '', strengths: '', weaknesses1: '', weaknesses2: '', improvements: '', extraSources: '' };

    const updateSection = (key: string, val: string) => {
      const updatedSections = { ...sections, [key]: val };
      handleWorkspaceChange({ ...workspaceData, sections: updatedSections });
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">분석 및 피드백 대상 <span className="text-rose-500">*</span></label>
            <input
              type="text"
              placeholder="예: 김철수 연구원의 초안 서론"
              value={sections.target || ''}
              onChange={e => updateSection('target', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">대상 연구물의 장점 (Strengths)</label>
            <input
              type="text"
              placeholder="논리 전개가 확실하거나 뛰어난 특징"
              value={sections.strengths || ''}
              onChange={e => updateSection('strengths', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">한계점 1 (Weakness 1) <span className="text-rose-500">*</span></label>
            <textarea
              rows={2}
              placeholder="보완해야 할 논리 구조나 자료 한계점"
              value={sections.weaknesses1 || ''}
              onChange={e => updateSection('weaknesses1', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">한계점 2 (Weakness 2) <span className="text-rose-500">*</span></label>
            <textarea
              rows={2}
              placeholder="참고문헌/인용 방식 등의 개선이 필요한 한계점"
              value={sections.weaknesses2 || ''}
              onChange={e => updateSection('weaknesses2', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-xs focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5">
            이 분석을 통해 내 연구에서 보완할 점 <span className="text-rose-500">*</span>
            <span className="ml-2 text-[10px] font-normal text-slate-400">
              (현재 {(sections.improvements || '').length}자 / 최소 200자)
            </span>
          </label>
          <textarea
            rows={5}
            placeholder="타인의 한계점을 보고 깨달은 시사점, 향후 내 논문의 논증에 대입할 개선 사항을 200자 이상 서술해주세요."
            value={sections.improvements || ''}
            onChange={e => updateSection('improvements', e.target.value)}
            className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm focus:outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">추가로 연계하여 확인할 자료 정보 <span className="text-rose-500">*</span></label>
          <input
            type="text"
            placeholder="예: IPCC 제6차 보고서 재원분석 파트"
            value={sections.extraSources || ''}
            onChange={e => updateSection('extraSources', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm focus:outline-none"
          />
        </div>
      </div>
    );
  };

  const getEditorRenderer = () => {
    switch (mission.type) {
      case 'reading': return renderReadingEditor();
      case 'organizing': return renderOrganizingEditor();
      case 'writing': return renderWritingEditor();
      case 'revision': return renderRevisionEditor();
      case 'feedback': return renderFeedbackEditor();
      default:
        return (
          <textarea
            rows={8}
            placeholder="내용을 입력해주세요."
            value={workspaceData.text || ''}
            onChange={e => handleWorkspaceChange({ ...workspaceData, text: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-sm focus:outline-none"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header (Back Button + Meta Info) */}
      <div className="flex flex-col gap-4">
        <div>
          <button
            onClick={() => navigate('/plan')}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            전체 데일리 플랜 목록으로 돌아가기
          </button>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge type="mission-type" value={mission.type} />
              <StatusBadge type="mission-status" value={mission.status} />
              <span className="text-[10px] font-extrabold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                {mission.date}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight truncate">
              {mission.title}
            </h2>
            <p className="text-xs font-medium text-slate-400">{mission.description}</p>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 shrink-0 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Clock className="size-4.5" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">예상 소요 시간</span>
                <span className="text-sm font-extrabold text-slate-800">약 {mission.estimatedMinutes}분</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Progress Bar Panel */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-extrabold text-slate-700">실시간 미션 작업 완성도</span>
          <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50/70 border border-indigo-100/50 px-2.5 py-0.5 rounded-lg">
            {progress}%
          </span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 ? (
          <p className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1.5 animate-pulse">
            <CheckCircle className="size-3.5" />
            모든 완료 기준 충족 완료! 하단의 [최종 완료 처리] 버튼을 눌러 미션을 완료하세요.
          </p>
        ) : (
          <p className="text-[10px] text-slate-400 font-medium">
            작성 폼을 작성하면 완성도가 실시간으로 계산됩니다. 100% 달성 시 최종 완료 처리가 가능합니다.
          </p>
        )}
      </div>

      {/* 3. Main Split Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Criteria & Info */}
        <div className="space-y-6">
          {/* Criteria Checklist Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <ListTodo className="size-4.5 text-indigo-600" />
              미션 통과 기준
            </h3>

            {/* Structured Criteria Items */}
            <div className="space-y-3.5">
              {mission.type === 'reading' && (
                <>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.notes?.[0]?.title || '').trim().length > 0 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">읽은 자료 제목 입력</span>
                      자료 요약 시 제목은 필수입니다.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.notes?.[0]?.summary || '').trim().length >= 300 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">핵심 내용 요약 작성</span>
                      최소 300자 이상 작성 (현재 {(workspaceData.notes?.[0]?.summary || '').length}자)
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.notes?.[0]?.relevance || '').trim().length >= 150 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">주제 관련성 작성</span>
                      최소 150자 이상 작성 (현재 {(workspaceData.notes?.[0]?.relevance || '').length}자)
                    </div>
                  </div>
                </>
              )}

              {mission.type === 'organizing' && (
                <>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.notes || []).length >= 2 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">요약 항목 2개 이상 작성</span>
                      최소 2개의 카드가 작성되어야 합니다. (현재 {(workspaceData.notes || []).length}개)
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {((workspaceData.notes || []).length >= 2 && 
                      (workspaceData.notes?.[0]?.claim || '').trim().length >= 100 && 
                      (workspaceData.notes?.[1]?.claim || '').trim().length >= 100) ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">핵심 주장 분량 충족</span>
                      작성된 각 카드의 주장이 100자 이상이어야 합니다.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.notes || []).some((n: any) => n.doiOrUrl && n.doiOrUrl.trim().length > 0) ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5 animate-pulse text-amber-500" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">출처 정보 DOI/URL 입력</span>
                      최소 1개 이상의 유효한 출처 주소가 필요합니다.
                      {!(workspaceData.notes || []).some((n: any) => n.doiOrUrl && n.doiOrUrl.trim().length > 0) && (
                        <span className="block text-[10px] text-amber-600 font-semibold mt-1">⚠️ 출처 정보 부족</span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {mission.type === 'writing' && (
                <>
                  <div className="flex items-start gap-2.5 text-xs">
                    {((workspaceData.sections?.problem || '') + 
                      (workspaceData.sections?.purpose || '') + 
                      (workspaceData.sections?.question || '') + 
                      (workspaceData.sections?.draft || '')).trim().length >= 600 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">전체 작성량 600자 이상</span>
                      전체 섹션 글자 수 총합이 600자 이상이어야 합니다.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.sections?.question || '').trim().length > 0 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">연구 질문 1개 이상 입력</span>
                      질문 섹션 기재 필수
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {[
                      workspaceData.sections?.problem || '',
                      workspaceData.sections?.purpose || '',
                      workspaceData.sections?.question || '',
                      workspaceData.sections?.draft || ''
                    ].filter(text => text.trim().length > 0).length >= 3 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">빈 섹션 1개 이하</span>
                      최소 3개 이상의 개별 입력 영역을 채우셔야 합니다.
                    </div>
                  </div>
                </>
              )}

              {mission.type === 'revision' && (
                <>
                  <div className="flex items-start gap-2.5 text-xs">
                    {((workspaceData.checklist || []).filter((item: any) => item.checked).length / (workspaceData.checklist || []).length) >= 0.8 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">필수 체크리스트 80% 이상 완료</span>
                      체크 5개 중 최소 4개 체크가 완료되어야 합니다.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.text || '').trim().length >= 200 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">수정 메모 200자 이상 작성</span>
                      보완 메모 필수 기입 (현재 {(workspaceData.text || '').length}자)
                    </div>
                  </div>
                </>
              )}

              {mission.type === 'feedback' && (
                <>
                  <div className="flex items-start gap-2.5 text-xs">
                    {((workspaceData.sections?.weaknesses1 || '').trim().length > 0 && 
                      (workspaceData.sections?.weaknesses2 || '').trim().length > 0) ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">한계점 2개 이상 기입</span>
                      한계점 1, 2 항목 작성 필수
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.sections?.improvements || '').trim().length >= 200 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">내 연구 보완점 200자 이상 작성</span>
                      피드백을 통한 깨달음 기록 (현재 {(workspaceData.sections?.improvements || '').length}자)
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    {(workspaceData.sections?.extraSources || '').trim().length > 0 ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-slate-200 shrink-0 mt-0.5" />
                    )}
                    <div className="text-slate-600">
                      <span className="font-bold block text-slate-800">추가 확인 자료 1개 이상 입력</span>
                      참고 문헌 정보 기재 필수
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Research Tip Box */}
          <div className="bg-indigo-950 text-indigo-200 rounded-2xl p-5 shadow-sm space-y-2.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 size-20 bg-indigo-800 rounded-full opacity-20 blur-md" />
            <h4 className="font-bold text-xs text-white flex items-center gap-1">
              <Sparkles className="size-3.5 text-indigo-400" />
              Research Mate Tip
            </h4>
            <p className="text-[11px] leading-relaxed">
              Research Mate는 텍스트 입력의 양보다 체계적인 정리와 연구 논거 확보를 권장합니다. 각 양식에 맞춰 내용을 충실히 적을수록 최종 AI 점검(AI Check)과 동료 리뷰 통과율이 크게 상승합니다.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Form Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            
            {/* Editor Top Bar with Auto Save State */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <PenTool className="size-4.5 text-indigo-600" />
                작업 공간 Editor
              </span>
              
              {/* Auto Save status indicator */}
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 select-none">
                {saveStatus === 'saving' && (
                  <>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                    <span className="text-amber-500">저장 중...</span>
                  </>
                )}
                {saveStatus === 'saved' && (
                  <>
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span className="text-emerald-600">저장 완료 (클라우드 동기화됨)</span>
                  </>
                )}
                {saveStatus === 'idle' && (
                  <span>실시간 자동 저장 활성화됨</span>
                )}
              </div>
            </div>

            {/* Dynamic Editor Form Rendering */}
            <div>
              {getEditorRenderer()}
            </div>

          </div>
        </div>

      </div>

      {/* 4. Bottom Actions Control Panel */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/plan')}
            className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer w-full sm:w-auto"
          >
            이전 화면으로 돌아가기
          </button>
        </div>

        <div className="flex flex-wrap justify-end gap-3 w-full sm:w-auto">
          <button
            onClick={handleManualSave}
            className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 w-full sm:w-auto justify-center"
          >
            <Save className="size-4" />
            수동 임시 저장
          </button>
          
          <button
            onClick={() => setShowDelayConfirm(true)}
            className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer w-full sm:w-auto justify-center"
          >
            미루기 (벌금 차감)
          </button>

          <button
            onClick={handleFinalSubmit}
            disabled={mission.status === 'completed'}
            className={`px-6 py-2.5 font-bold rounded-xl text-xs transition-all w-full sm:w-auto justify-center cursor-pointer ${
              mission.status === 'completed'
                ? 'bg-slate-100 text-slate-400 border cursor-not-allowed'
                : progress === 100
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/10'
                  : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
            }`}
          >
            {mission.status === 'completed' ? '완료된 미션' : progress === 100 ? '최종 완료 처리 가능!' : '완료 기준 미달 (확인)'}
          </button>
        </div>
      </div>

      {/* Validation Criteria Modal */}
      {showValidationAlert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 max-w-md w-full space-y-4">
            <div className="size-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="size-6" />
            </div>

            <div className="text-center">
              <h3 className="font-extrabold text-slate-900 text-base">아직 완료 기준을 충족하지 못했습니다.</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                해당 미션의 학술적 완료 기준을 충족해야 완료 처리가 가능합니다. 다음 부족한 조건을 보완해주세요.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl max-h-48 overflow-y-auto">
              <ul className="space-y-2 text-xs font-medium text-slate-600 list-disc list-inside">
                {validationErrors.map((err, idx) => (
                  <li key={idx} className="text-rose-600 leading-normal">{err}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowValidationAlert(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                확인하고 마저 작성하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delay Confirmation Modal */}
      {showDelayConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 max-w-sm w-full space-y-4">
            <div className="size-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="size-6" />
            </div>

            <div className="text-center">
              <h3 className="font-extrabold text-slate-900 text-base">미션을 하루 연기하시겠습니까?</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                미션을 미룰 경우 전체 일정이 뒤로 밀리며, 작성 진척률에 따라 보증금에서 벌금이 차감됩니다.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-2.5 text-xs text-slate-600 border border-slate-100/50">
              <div className="flex justify-between items-center">
                <span>현재 작성 진행률:</span>
                <span className="font-bold text-slate-800">{progress}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>예상 차감 벌금:</span>
                <span className="font-bold text-rose-600">
                  {delayPenalty === 0 ? '없음 (진척도 71% 이상)' : `${delayPenalty.toLocaleString()}원`}
                </span>
              </div>
              <div className="border-t border-slate-200/50 pt-2 text-[10px] text-slate-400 leading-normal">
                💡 <span className="font-semibold">벌금 차감 기준:</span><br />
                - 0~20% 진행: 벌금 500원 (100% 차감)<br />
                - 21~70% 진행: 벌금 250원 (50% 차감)<br />
                - 71% 이상 진행: 벌금 면제 (경고만 표시)
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowDelayConfirm(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelay}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                연기 확인
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
