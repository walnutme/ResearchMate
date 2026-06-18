/**
 * finalCheckLogic.ts
 *
 * 사용자가 작성한 실제 콘텐츠를 기반으로 AI 최종 점검 결과를 생성하는 로직.
 * - 실제 외부 API 없이 heuristic mock analysis 제공
 * - 고정 점수 없음 – 텍스트 상태에 따라 동적으로 결과 변경
 * - 표절률(%) 표현 금지 – 유사도 위험 판단만 제공
 */

import { Mission, Source, ClaimNode, Draft, FinalCheckResult } from '../types';

// ─── 콘텐츠 수집 ────────────────────────────────────────────────────────────

export interface CollectedContent {
  totalCharacters: number;
  draftIntro: string;
  draftBody: string;
  draftConclusion: string;
  missionTexts: string[];
  allWrittenText: string;  // draft + mission workspace text 합산
  sourceCount: number;
  sources: Source[];
  claims: ClaimNode[];
}

/**
 * 현재 프로젝트의 사용자 작성 내용 전부를 수집합니다.
 */
export function collectWrittenContent(
  draft: Draft,
  missions: Mission[],
  sources: Source[],
  claims: ClaimNode[]
): CollectedContent {
  const draftIntro = (draft.introText || '').trim();
  const draftBody = (draft.bodyText || '').trim();
  const draftConclusion = (draft.conclusionText || '').trim();

  // 미션 워크스페이스에서 사용자가 직접 작성한 텍스트 추출
  const missionTexts: string[] = [];
  for (const m of missions) {
    const ws = m.workspaceData;
    if (!ws) continue;
    if (ws.text && ws.text.trim()) missionTexts.push(ws.text.trim());
    if (ws.sections) {
      Object.values(ws.sections).forEach(s => {
        if (typeof s === 'string' && s.trim()) missionTexts.push(s.trim());
      });
    }
    if (ws.notes && Array.isArray(ws.notes)) {
      ws.notes.forEach((n: any) => {
        if (typeof n === 'string' && n.trim()) missionTexts.push(n.trim());
        if (n && typeof n.content === 'string' && n.content.trim()) missionTexts.push(n.content.trim());
      });
    }
  }

  const allWrittenText = [draftIntro, draftBody, draftConclusion, ...missionTexts]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    totalCharacters: allWrittenText.length,
    draftIntro,
    draftBody,
    draftConclusion,
    missionTexts,
    allWrittenText,
    sourceCount: sources.length,
    sources,
    claims,
  };
}

// ─── content hash ────────────────────────────────────────────────────────────

/**
 * 작성 내용의 변경 여부를 감지하기 위한 간단한 해시 생성.
 */
export function generateContentHash(content: CollectedContent): string {
  const raw = [
    content.draftIntro,
    content.draftBody,
    content.draftConclusion,
    ...content.missionTexts,
    content.sourceCount,
    content.claims.map(c => c.text).join(''),
  ].join('|');

  // djb2-like hash
  let hash = 5381;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) + hash) + raw.charCodeAt(i);
    hash = hash & hash; // 32-bit
  }
  return Math.abs(hash).toString(36);
}

// ─── 점검 실행 조건 ──────────────────────────────────────────────

/** 단어/페이지 기준일 때 최소 글자 수 (characters in written text) */
export const MIN_CHARACTERS = 300;
/** 글자 기준 과제일 때 최소 글자 수 */
export const MIN_CHARACTERS_FOR_CHAR_UNIT = 1000;

export interface CheckEligibility {
  eligible: boolean;
  totalCharacters: number;
  minRequired: number;
  reason?: string;
}

export function checkEligibility(
  content: CollectedContent,
  targetUnit?: 'pages' | 'words' | 'characters'
): CheckEligibility {
  const minRequired = targetUnit === 'characters' ? MIN_CHARACTERS_FOR_CHAR_UNIT : MIN_CHARACTERS;
  if (content.totalCharacters < minRequired) {
    return {
      eligible: false,
      totalCharacters: content.totalCharacters,
      minRequired,
      reason: `현재 작성량이 ${content.totalCharacters}자입니다. 최소 ${minRequired}자 이상 작성해야 AI 최종 점검을 실행할 수 있습니다.`,
    };
  }
  return { eligible: true, totalCharacters: content.totalCharacters, minRequired };
}

// ─── 점검 결과 생성 ──────────────────────────────────────────────────────────

/**
 * 실제 작성 내용을 바탕으로 heuristic 점검 결과를 생성합니다.
 * 외부 API 없이 텍스트 상태에 따라 동적으로 결과가 달라집니다.
 */
export function runFinalCheck(content: CollectedContent): FinalCheckResult {
  const {
    draftIntro, draftBody, draftConclusion,
    allWrittenText, sources, claims, missionTexts
  } = content;

  const hasIntro = draftIntro.length > 50;
  const hasBody  = draftBody.length  > 50;
  const hasConclusion = draftConclusion.length > 50;
  const sectionsCompleted = [hasIntro, hasBody, hasConclusion].filter(Boolean).length;

  // ── 1. 논리 흐름 점검 ──────────────────────────────────────────────────────
  const logicFeedback: string[] = [];
  let logicScore = 0;

  if (hasIntro) logicScore += 30;
  else logicFeedback.push('서론이 작성되지 않았습니다. 연구 배경과 목적을 서론에 명시해주세요.');

  if (hasBody) logicScore += 30;
  else logicFeedback.push('본론이 작성되지 않았습니다. 주장과 근거를 본론에 전개해주세요.');

  if (hasConclusion) logicScore += 20;
  else logicFeedback.push('결론이 작성되지 않았습니다. 연구 요약과 함의를 결론에 작성해주세요.');

  const hasClaim    = claims.some(c => c.type === 'claim' && c.text.trim());
  const hasEvidence = claims.some(c => c.type === 'evidence' && c.text.trim());
  const hasCounter  = claims.some(c => c.type === 'counter' && c.text.trim());
  const hasRebuttal = claims.some(c => c.type === 'rebuttal' && c.text.trim());

  if (hasClaim && hasEvidence) {
    logicScore += 15;
  } else {
    if (!hasClaim) logicFeedback.push('주장(Claim)이 등록되지 않았습니다. 주장&근거 섹션에서 핵심 주장을 추가해주세요.');
    if (!hasEvidence) logicFeedback.push('근거(Evidence)가 등록되지 않았습니다. 주장을 뒷받침하는 근거를 추가해주세요.');
  }

  if (hasCounter && hasRebuttal) {
    logicScore += 5;
  } else if (hasCounter) {
    logicFeedback.push('반론(Counter-argument)에 대한 재반박(Rebuttal)이 없습니다. 논리 강화를 위해 재반박을 추가해주세요.');
  }

  if (logicFeedback.length === 0) {
    logicFeedback.push('서론·본론·결론이 모두 작성되어 있고 주장·근거 구조가 확인됩니다.');
  }

  const logicStatus =
    logicScore >= 80 ? 'good' :
    logicScore >= 40 ? 'needsWork' :
    'insufficient';

  // ── 2. 인용/출처 점검 ──────────────────────────────────────────────────────
  const citationFeedback: string[] = [];
  const missingSources: string[] = [];

  if (sources.length === 0) {
    citationFeedback.push('등록된 출처가 없습니다. 출처 섹션에서 참고문헌을 추가해주세요.');
  } else {
    const avgCompleteness = sources.reduce((sum, s) => sum + (s.completeness || 0), 0) / sources.length;
    if (avgCompleteness < 50) {
      citationFeedback.push('일부 출처의 정보(DOI/URL, 저자, 연도 등)가 부족합니다. 출처 완성도를 높여주세요.');
    }
    sources.forEach(s => {
      if (!s.doiOrUrl) {
        missingSources.push(`"${s.title || '제목 없음'}" — DOI/URL 누락`);
      }
    });
    if (missingSources.length === 0 && avgCompleteness >= 75) {
      citationFeedback.push(`${sources.length}개의 출처가 등록되어 있으며 인용 정보가 비교적 충실합니다.`);
    }
  }

  // draft 또는 mission 텍스트에 인용 표시 여부 확인 (간단한 휴리스틱)
  const hasCitationMark = /\([\w가-힣]+,?\s*\d{4}\)|【|〔|\[[\w가-힣]+\s*\d{4}\]/.test(allWrittenText);
  if (sources.length > 0 && !hasCitationMark) {
    citationFeedback.push('본문에 인용 표시(예: 홍길동, 2023)가 발견되지 않았습니다. 출처를 인용할 경우 본문 내 인용 표기를 추가해주세요.');
  }

  const citationStatus =
    sources.length >= 2 && missingSources.length === 0 ? 'good' :
    sources.length >= 1 ? 'needsWork' :
    'insufficient';

  const citationCompleteness = sources.length > 0
    ? Math.round(sources.reduce((sum, s) => sum + (s.completeness || 0), 0) / sources.length)
    : 0;

  // ── 3. 문법/표현 점검 (휴리스틱) ─────────────────────────────────────────
  const expressionFeedback: string[] = [];
  let expressionScore = 70; // 기본값 보통

  // 문단 길이 체크
  const paragraphs = allWrittenText.split(/\n+/).filter(p => p.trim().length > 0);
  const shortParagraphs = paragraphs.filter(p => p.trim().length < 30).length;
  if (shortParagraphs > 0) {
    expressionScore -= 15;
    expressionFeedback.push(`${shortParagraphs}개의 문단이 30자 미만으로 너무 짧습니다. 논리 전개가 충분하지 않을 수 있습니다.`);
  }

  // 반복 단어 체크 (5회 이상 등장하는 단어)
  const wordFreq: Record<string, number> = {};
  const words = allWrittenText.replace(/[^\uAC00-\uD7A3\w]/g, ' ').split(/\s+/).filter(w => w.length > 1);
  words.forEach(w => { wordFreq[w] = (wordFreq[w] || 0) + 1; });
  const repeatedWords = Object.entries(wordFreq).filter(([w, count]) => count >= 5 && w.length >= 2).slice(0, 3);
  if (repeatedWords.length > 0) {
    expressionScore -= 10;
    expressionFeedback.push(`"${repeatedWords.map(([w]) => w).join('", "')}" 등의 표현이 반복됩니다. 다양한 표현으로 바꿔보세요.`);
  }

  // 구어적 표현 휴리스틱
  const informalPatterns = ['아주 좋', '정말 중요', '매우 훌륭', '너무 많은', '엄청난'];
  const foundInformal = informalPatterns.filter(p => allWrittenText.includes(p));
  if (foundInformal.length > 0) {
    expressionScore -= 10;
    expressionFeedback.push('일부 구어적·주관적 표현이 발견되었습니다. 학술적 격식체 표현으로 교체하는 것을 권장합니다.');
  }

  if (expressionFeedback.length === 0) {
    expressionFeedback.push('문장 구조나 반복 표현에서 크게 문제되는 부분이 발견되지 않았습니다. 실제 문법 검사 도구를 통해 추가 점검을 권장합니다.');
  }

  expressionScore = Math.max(0, Math.min(100, expressionScore));

  const expressionStatus =
    expressionScore >= 75 ? 'good' :
    expressionScore >= 45 ? 'needsWork' :
    'insufficient';

  // ── 4. 유사도 위험 점검 ────────────────────────────────────────────────────
  // 실제 외부 DB 비교 없음 – 출처에 입력한 "인용할 문장"과 draft의 유사도만 확인
  const similarityFeedback: string[] = [];
  let similarityStatus: 'notChecked' | 'low' | 'needsReview' = 'notChecked';

  const quotationsInSources = sources
    .map(s => (s.quotation || '').trim())
    .filter(q => q.length > 15);

  if (quotationsInSources.length > 0) {
    const needsReview = quotationsInSources.filter(q => {
      // 출처에 등록한 인용 문장 중 draft에 그대로 포함된 것이 있는지 확인
      const shortened = q.substring(0, 20);
      const appearsInDraft = allWrittenText.includes(shortened);
      // 인용 표시 없이 그대로 포함된 경우 위험 판단
      return appearsInDraft && !hasCitationMark;
    });

    if (needsReview.length > 0) {
      similarityStatus = 'needsReview';
      similarityFeedback.push('출처에 입력한 인용 문장과 유사한 표현이 본문에서 발견되었으나 인용 표시가 없습니다. 인용 표시를 추가하거나 문장을 패러프레이즈하세요.');
    } else {
      similarityStatus = 'low';
      similarityFeedback.push('출처에 입력된 인용 문장이 본문에 인용 표시 없이 그대로 포함된 경우는 발견되지 않았습니다.');
    }
  } else {
    similarityFeedback.push('비교할 출처 인용 문장이 없어 유사도 점검을 진행하지 않았습니다.');
  }

  const similarityDisclaimer =
    '⚠️ 이 점검은 사용자가 출처 섹션에 입력한 "인용할 문장"과 본문을 비교한 것으로, 외부 논문 데이터베이스나 인터넷과 비교한 실제 표절 검사가 아닙니다. 정확한 유사도 확인은 학교 표절 검사 도구 또는 외부 표절 검사 서비스(Turnitin, Copy Killer 등)를 이용하세요.';

  // ── 5. 제출 준비도 계산 ────────────────────────────────────────────────────
  // 작성 내용이 충분할 때만 0~100 점수 반환, 부족하면 null
  let readinessScore: number | null = null;

  if (content.totalCharacters >= MIN_CHARACTERS) {
    let score = 0;

    // 작성량 충족 (30점)
    const charRatio = Math.min(1, content.totalCharacters / 1500);
    score += Math.round(charRatio * 30);

    // 서론/본론/결론 작성 (25점)
    score += Math.round((sectionsCompleted / 3) * 25);

    // 출처 1개 이상 (15점)
    if (sources.length >= 1) score += 10;
    if (sources.length >= 3) score += 5;

    // 주장&근거 연결 (15점)
    if (hasClaim)    score += 7;
    if (hasEvidence) score += 8;

    // 미션 작업물 완료 (15점)
    const completedMissions = (content.missionTexts.length > 0) ? 15 : 0;
    score += completedMissions;

    readinessScore = Math.min(100, score);
  }

  return {
    checkedAt: new Date().toISOString(),
    contentHash: generateContentHash(content),
    totalCharacters: content.totalCharacters,
    sectionsCompleted,
    sourceCount: sources.length,
    citationCompleteness,
    readinessScore,
    logicFlow: {
      score: logicScore,
      status: logicStatus,
      feedback: logicFeedback,
    },
    citationCheck: {
      status: citationStatus,
      missingSources,
      feedback: citationFeedback,
    },
    expressionCheck: {
      score: expressionScore,
      status: expressionStatus,
      feedback: expressionFeedback,
    },
    similarityRisk: {
      status: similarityStatus,
      feedback: similarityFeedback,
      disclaimer: similarityDisclaimer,
    },
    isStale: false,
  };
}
