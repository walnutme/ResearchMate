import { Project, Mission, MissionType } from '../types';
import { differenceInDays, parseISO, format, addDays } from 'date-fns';
import { calculateRecommendedAmount } from './wordCount';

export function getInitialWorkspaceAndCriteria(type: MissionType, amount: string): { workspaceData: any; completionCriteria: any } {
  let workspaceData: any = {};
  let completionCriteria: any = {};

  if (type === 'reading') {
    workspaceData = {
      notes: [
        { id: 'note-1', title: '', author: '', summary: '', quotation: '', relevance: '' }
      ]
    };
    completionCriteria = {
      minCharacters: 300,
      minNotes: 1
    };
  } else if (type === 'organizing') {
    workspaceData = {
      notes: [
        { id: 'card-1', title: '', concept: '', claim: '', usage: '', doiOrUrl: '' },
        { id: 'card-2', title: '', concept: '', claim: '', usage: '', doiOrUrl: '' }
      ]
    };
    completionCriteria = {
      minNotes: 2,
      minCharacters: 100,
      minSources: 1
    };
  } else if (type === 'writing') {
    workspaceData = {
      sections: {
        problem: '',
        purpose: '',
        question: '',
        draft: ''
      }
    };
    completionCriteria = {
      minCharacters: 600,
      minSectionsCompleted: 3
    };
  } else if (type === 'revision') {
    workspaceData = {
      checklist: [
        { id: 'rev-1', label: '인용 양식 확인 (APA/MLA 등)', checked: false },
        { id: 'rev-2', label: '본문 내 인용 누락 확인', checked: false },
        { id: 'rev-3', label: '참고문헌 형식 일치 여부 확인', checked: false },
        { id: 'rev-4', label: 'DOI 및 URL 링크 누락 확인', checked: false },
        { id: 'rev-5', label: '문단 간 논리적 흐름 및 연결사 확인', checked: false }
      ],
      text: ''
    };
    completionCriteria = {
      minChecklistRate: 0.8,
      minCharacters: 200
    };
  } else if (type === 'feedback') {
    workspaceData = {
      sections: {
        target: '',
        strengths: '',
        weaknesses1: '',
        weaknesses2: '',
        improvements: '',
        extraSources: ''
      }
    };
    completionCriteria = {
      minNotes: 2,
      minCharacters: 200
    };
  }

  return { workspaceData, completionCriteria };
}

export function calculateMissionProgress(type: string, data: any): { progress: number; missing: string[] } {
  let progress = 0;
  const missing: string[] = [];

  if (!data) {
    return { progress: 0, missing: ['입력 데이터가 없습니다.'] };
  }

  if (type === 'reading') {
    const notes = data.notes || [];
    const firstNote = notes[0] || {};
    const title = firstNote.title || '';
    const summary = firstNote.summary || '';
    const relevance = firstNote.relevance || '';

    // Title check
    const titleFilled = title.trim().length > 0;
    if (titleFilled) {
      progress += 20;
    } else {
      missing.push('읽은 자료 제목을 입력해야 합니다.');
    }

    // Summary check (min 300)
    const summaryLength = summary.trim().length;
    const summaryProgress = Math.min(100, (summaryLength / 300) * 100);
    progress += Math.round(summaryProgress * 0.5); // Weight 50%
    if (summaryLength < 300) {
      missing.push(`핵심 내용 요약이 300자 이상 필요합니다. (현재 ${summaryLength}자)`);
    }

    // Relevance check (min 150)
    const relevanceLength = relevance.trim().length;
    const relevanceProgress = Math.min(100, (relevanceLength / 150) * 100);
    progress += Math.round(relevanceProgress * 0.3); // Weight 30%
    if (relevanceLength < 150) {
      missing.push(`내 연구 주제와의 관련성을 150자 이상 작성해야 합니다. (현재 ${relevanceLength}자)`);
    }

    progress = Math.min(100, progress);
  } else if (type === 'organizing') {
    const notes = data.notes || [];
    
    // Cards count check (min 2)
    const count = notes.length;
    const countProgress = Math.min(100, (count / 2) * 100);
    progress += Math.round(countProgress * 0.4); // Weight 40% (20% per card)
    if (count < 2) {
      missing.push(`요약 항목을 2개 이상 작성해야 합니다. (현재 ${count}개)`);
    }

    // Claim length of first 2 cards (min 100 each)
    let claimProgressTotal = 0;
    for (let i = 0; i < 2; i++) {
      const card = notes[i] || {};
      const claim = card.claim || '';
      const claimLength = claim.trim().length;
      claimProgressTotal += Math.min(100, (claimLength / 100) * 100);
      
      if (claimLength < 100 && i < count) {
        missing.push(`요약 항목 #${i + 1}의 핵심 주장은 100자 이상이어야 합니다. (현재 ${claimLength}자)`);
      } else if (i >= count) {
        missing.push(`요약 항목 #${i + 1}을 작성해야 합니다.`);
      }
    }
    progress += Math.round((claimProgressTotal / 2) * 0.4); // Weight 40%

    // Source DOI/URL check (min 1)
    const hasDoiOrUrl = notes.some((n: any) => n.doiOrUrl && n.doiOrUrl.trim().length > 0);
    if (hasDoiOrUrl) {
      progress += 20; // Weight 20%
    } else {
      missing.push('출처 정보(DOI 또는 URL)가 1개 이상 필요합니다. (현재 0개 - 출처 정보 부족)');
    }

    progress = Math.min(100, progress);
  } else if (type === 'writing') {
    const sections = data.sections || {};
    const problem = sections.problem || '';
    const purpose = sections.purpose || '';
    const question = sections.question || '';
    const draft = sections.draft || '';

    const totalChars = (problem + purpose + question + draft).trim().length;
    const charProgress = Math.min(100, (totalChars / 600) * 100);
    progress += Math.round(charProgress * 0.5); // Weight 50%
    if (totalChars < 600) {
      missing.push(`전체 작성량이 600자 이상이어야 합니다. (현재 ${totalChars}자)`);
    }

    // Research question check
    const hasQuestion = question.trim().length > 0;
    if (hasQuestion) {
      progress += 25; // Weight 25%
    } else {
      missing.push('연구 질문을 1개 이상 입력해야 합니다.');
    }

    // Empty sections <= 1 (meaning >= 3 sections have content)
    const activeSections = [problem, purpose, question, draft].filter(text => text.trim().length > 0).length;
    if (activeSections >= 3) {
      progress += 25;
    } else {
      progress += Math.round((activeSections / 3) * 25);
      missing.push(`최소 3개 이상의 섹션을 채워야 합니다. (현재 ${activeSections}개 작성됨)`);
    }

    progress = Math.min(100, progress);
  } else if (type === 'revision') {
    const checklist = data.checklist || [];
    const text = data.text || '';

    // Checklist rate (min 80%)
    const totalChecklist = checklist.length;
    const checkedCount = checklist.filter((item: any) => item.checked).length;
    const checklistRate = totalChecklist > 0 ? (checkedCount / totalChecklist) : 0;
    const checklistProgress = Math.min(100, (checklistRate / 0.8) * 100);
    progress += Math.round(checklistProgress * 0.5); // Weight 50%
    if (checklistRate < 0.8) {
      const requiredChecked = Math.ceil(totalChecklist * 0.8);
      missing.push(`필수 체크리스트를 80% 이상 완료해야 합니다. (현재 ${checkedCount}/${totalChecklist} 완료, 최소 ${requiredChecked}개 필요)`);
    }

    // Revision memo (min 200 chars)
    const memoLength = text.trim().length;
    const memoProgress = Math.min(100, (memoLength / 200) * 100);
    progress += Math.round(memoProgress * 0.5); // Weight 50%
    if (memoLength < 200) {
      missing.push(`수정 메모를 200자 이상 작성해야 합니다. (현재 ${memoLength}자)`);
    }

    progress = Math.min(100, progress);
  } else if (type === 'feedback') {
    const sections = data.sections || {};
    const weaknesses1 = sections.weaknesses1 || '';
    const weaknesses2 = sections.weaknesses2 || '';
    const improvements = sections.improvements || '';
    const extraSources = sections.extraSources || '';

    // Weaknesses count >= 2
    const w1Filled = weaknesses1.trim().length > 0;
    const w2Filled = weaknesses2.trim().length > 0;
    let weaknessScore = 0;
    if (w1Filled) weaknessScore += 20;
    if (w2Filled) weaknessScore += 20;
    progress += weaknessScore; // Weight 40% (20% each)
    if (!w1Filled || !w2Filled) {
      missing.push('한계점을 2개 이상 입력해야 합니다.');
    }

    // Improvements >= 200 chars
    const impLength = improvements.trim().length;
    const impProgress = Math.min(100, (impLength / 200) * 100);
    progress += Math.round(impProgress * 0.4); // Weight 40%
    if (impLength < 200) {
      missing.push(`내 연구에서 보완할 점을 200자 이상 작성해야 합니다. (현재 ${impLength}자)`);
    }

    // Extra sources >= 1
    const extraFilled = extraSources.trim().length > 0;
    if (extraFilled) {
      progress += 20; // Weight 20%
    } else {
      missing.push('추가로 확인할 자료를 1개 이상 입력해야 합니다.');
    }

    progress = Math.min(100, progress);
  }

  return { progress, missing };
}

export function generateMissions(project: Project): Mission[] {
  const today = new Date();
  const deadlineDate = parseISO(project.deadline);
  
  // Calculate total days left
  let totalDays = differenceInDays(deadlineDate, today);
  if (totalDays <= 0) totalDays = 1; // 최소 1일 보장
  
  const missions: Mission[] = [];
  const plan = project.selectedPlan || 'complete';
  const dailyTime = project.dailyWorkTime;
  
  // Base daily minutes based on selection
  let dailyMinutes = 30;
  if (dailyTime === '15m') dailyMinutes = 15;
  if (dailyTime === '30m') dailyMinutes = 30;
  if (dailyTime === '1h') dailyMinutes = 60;
  if (dailyTime === '2h_plus') dailyMinutes = 120;

  // Adapt based on plan type
  if (plan === 'complete') {
    dailyMinutes = Math.round(dailyMinutes * 1.2); // 집중 플랜은 시간 20% 상향
  }

  // Segment N days into phases: Reading -> Organizing -> Writing -> Feedback -> Revision
  const readingRatio = 0.2;
  const organizingRatio = 0.15;
  const writingRatio = 0.45;
  const feedbackRatio = 0.1;
  const revisionRatio = 0.1;

  let readDays = Math.max(1, Math.round(totalDays * readingRatio));
  let orgDays = Math.max(1, Math.round(totalDays * organizingRatio));
  let writeDays = Math.max(1, Math.round(totalDays * writingRatio));
  let feedbackDays = Math.max(1, Math.round(totalDays * feedbackRatio));
  let revDays = Math.max(1, totalDays - (readDays + orgDays + writeDays + feedbackDays));
  if (revDays < 1) revDays = 1;

  let currentDayOffset = 0;

  // Phase 1: Reading (읽기)
  for (let i = 0; i < readDays; i++) {
    const dateStr = format(addDays(today, currentDayOffset), 'yyyy-MM-dd');
    const amount = '논문 1~2편 읽기';
    const { workspaceData, completionCriteria } = getInitialWorkspaceAndCriteria('reading', amount);
    missions.push({
      id: `m-read-${i}`,
      projectId: project.id || '',
      title: `${project.topic} 관련 핵심 선행 연구 자료 ${i + 1}편 수집 및 요약`,
      description: '대표 논문/자료를 읽고 핵심 내용을 구조화하여 요약합니다.',
      type: 'reading',
      amount: amount,
      targetAmount: '핵심 요약 1건 이상 (300자 이상, 관련성 150자 이상)',
      duration: dailyMinutes,
      estimatedMinutes: dailyMinutes,
      status: 'pending',
      progress: 0,
      workspaceData,
      completionCriteria,
      date: dateStr,
    });
    currentDayOffset++;
  }

  // Phase 2: Organizing (정리)
  for (let i = 0; i < orgDays; i++) {
    const dateStr = format(addDays(today, currentDayOffset), 'yyyy-MM-dd');
    const amount = '주장 & 근거 3개 이상 작성';
    const { workspaceData, completionCriteria } = getInitialWorkspaceAndCriteria('organizing', amount);
    missions.push({
      id: `m-org-${i}`,
      projectId: project.id || '',
      title: '자료 인용 문장 추출 및 Argument Builder 개요 구조화',
      description: '선행연구의 핵심 개념과 주장, 출처 정보를 카드로 정리합니다.',
      type: 'organizing',
      amount: amount,
      targetAmount: '요약 항목 2개 이상 (핵심 주장 100자 이상, 출처 입력 필수)',
      duration: dailyMinutes,
      estimatedMinutes: dailyMinutes,
      status: 'pending',
      progress: 0,
      workspaceData,
      completionCriteria,
      date: dateStr,
    });
    currentDayOffset++;
  }

  // Phase 3: Writing (쓰기)
  const isMinimal = plan === 'minimal';
  const lang = (project as any).language ?? '한국어'; // 과제별 작성 언어

  // 목표 단위 기반 권장 분량 계산
  const recAmount = calculateRecommendedAmount({
    targetAmountNum: project.targetAmountNum,
    targetUnit: project.targetUnit ?? 'words',
  });
  const isCharMode = recAmount.unit === 'characters';
  const unitLabel = isCharMode ? '자' : '단어';

  for (let i = 0; i < writeDays; i++) {
    const dateStr = format(addDays(today, currentDayOffset), 'yyyy-MM-dd');
    let title = '';
    let amount = '';
    let targetAmountStr = '';

    if (i < Math.ceil(writeDays * 0.25)) {
      title = `${lang} 서론 초안 작성: ${project.topic} 문제 제기 및 연구 질문`;
      if (isCharMode) {
        amount = isMinimal ? `서론 초안 ${Math.round(recAmount.intro * 0.5)}자 작성` : `서론 초안 ${recAmount.intro}자 작성`;
        targetAmountStr = `서론 ${recAmount.intro.toLocaleString()}자 작성 목표`;
      } else {
        amount = isMinimal ? '0.5 페이지 작성' : '1.5 문단 작성';
        targetAmountStr = `서론 초안 ${recAmount.intro}단어 작성 (전체의 15%)`;
      }
    } else if (i < Math.ceil(writeDays * 0.8)) {
      title = `${lang} 본론 작성: 주장과 수집한 근거 및 통계 수치 연계 집필`;
      if (isCharMode) {
        amount = isMinimal ? `본론 초안 ${Math.round(recAmount.body * 0.5)}자 작성` : `본론 초안 ${recAmount.body}자 작성`;
        targetAmountStr = `본론 ${recAmount.body.toLocaleString()}자 작성 목표`;
      } else {
        amount = isMinimal ? '1 페이지 작성' : '2 페이지 작성';
        targetAmountStr = `본론 초안 ${recAmount.body}단어 작성 (전체의 70%)`;
      }
    } else {
      title = `${lang} 결론 작성: 연구 요약 및 학술적 의의 정리`;
      if (isCharMode) {
        amount = isMinimal ? `결론 초안 ${Math.round(recAmount.conclusion * 0.5)}자 작성` : `결론 초안 ${recAmount.conclusion}자 작성`;
        targetAmountStr = `결론 ${recAmount.conclusion.toLocaleString()}자 작성 목표`;
      } else {
        amount = isMinimal ? '0.5 페이지 작성' : '1 페이지 작성';
        targetAmountStr = `결론 초안 ${recAmount.conclusion}단어 작성 (전체의 15%)`;
      }
    }

    const { workspaceData, completionCriteria } = getInitialWorkspaceAndCriteria('writing', amount);
    missions.push({
      id: `m-write-${i}`,
      projectId: project.id || '',
      title: title,
      description: `각 색션별(문제 제기, 연구 목적, 연구 질문, 임시 문단) 내용을 집필하여 초안을 작성합니다. (${isCharMode ? '글자 수' : '단어 수'} 기준)`,
      type: 'writing',
      amount: amount,
      targetAmount: targetAmountStr || '전체 600자 이상 및 연구 질문 1개 이상 작성',
      duration: dailyMinutes,
      estimatedMinutes: dailyMinutes,
      status: 'pending',
      progress: 0,
      workspaceData,
      completionCriteria,
      date: dateStr,
    });
    currentDayOffset++;
  }

  // Phase 4: Feedback (피드백)
  for (let i = 0; i < feedbackDays; i++) {
    const dateStr = format(addDays(today, currentDayOffset), 'yyyy-MM-dd');
    const amount = '피어 리뷰 1건 완료';
    const { workspaceData, completionCriteria } = getInitialWorkspaceAndCriteria('feedback', amount);
    missions.push({
      id: `m-feed-${i}`,
      projectId: project.id || '',
      title: '초안 AI 최종 점검 실행 및 동료 Peer Review 요청 & 타인 논문 피드백 1회 작성',
      description: '선행연구의 한계점과 장단점을 분석하고, 내 연구에 반영할 개선점과 추가 확인 필요 자료를 작성합니다.',
      type: 'feedback',
      amount: amount,
      targetAmount: '한계점 2개 이상 및 보완점 200자 이상 작성',
      duration: Math.round(dailyMinutes * 0.8),
      estimatedMinutes: Math.round(dailyMinutes * 0.8),
      status: 'pending',
      progress: 0,
      workspaceData,
      completionCriteria,
      date: dateStr,
    });
    currentDayOffset++;
  }

  // Phase 5: Revision (수정)
  for (let i = 0; i < revDays; i++) {
    const dateStr = format(addDays(today, currentDayOffset), 'yyyy-MM-dd');
    const amount = '오류 100% 수정 완료';
    const { workspaceData, completionCriteria } = getInitialWorkspaceAndCriteria('revision', amount);
    missions.push({
      id: `m-rev-${i}`,
      projectId: project.id || '',
      title: '받은 피드백 기반 문단 흐름 개선 및 인용 표기 스타일 최종 퇴고',
      description: '수정 체크리스트를 기반으로 인용 양식, 참고문헌, 흐름을 점검하고 보완 메모를 작성합니다.',
      type: 'revision',
      amount: amount,
      targetAmount: '체크리스트 80% 이상 완료 및 수정 메모 200자 이상 작성',
      duration: dailyMinutes,
      estimatedMinutes: dailyMinutes,
      status: 'pending',
      progress: 0,
      workspaceData,
      completionCriteria,
      date: dateStr,
    });
    currentDayOffset++;
  }

  return missions;
}
