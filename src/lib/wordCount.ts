import { Project } from '../types';

/**
 * 텍스트에서 단어 수를 계산합니다.
 * 공백(스페이스, 탭, 줄바꿈 등)을 기준으로 분리합니다.
 */
export function countWords(text: string): number {
  if (!text || text.trim() === '') return 0;
  return text.trim().split(/\s+/).length;
}

/**
 * 텍스트에서 글자 수를 계산합니다.
 * 공백(스페이스, 탭, 줄바꿈)을 제외한 글자 수를 반환합니다.
 * 문장부호는 포함됩니다.
 */
export function countCharacters(text: string): number {
  if (!text || text.trim() === '') return 0;
  // 모든 공백(스페이스, 탭, 줄바꿈) 제거 후 길이 반환
  return text.replace(/\s/g, '').length;
}

export interface RecommendedAmount {
  unit: 'words' | 'characters';
  total: number;
  intro: number;
  body: number;
  conclusion: number;
  /** 표시용 레이블 (예: "단어", "자") */
  label: string;
  /** 페이지 기준일 때 보조 설명 */
  pageNote?: string;
}

/**
 * 프로젝트 설정을 기반으로 서론/본론/결론의 권장 분량을 계산합니다.
 *
 * - targetUnit === 'words': targetAmountNum 그대로 사용 (단위: 단어)
 * - targetUnit === 'pages': 1페이지 = 500단어 환산 (단위: 단어)
 * - targetUnit === 'characters': targetAmountNum 그대로 사용 (단위: 글자)
 * - 값이 없거나 0이면 기본값 사용 (words: 2000, pages: 4, characters: 6000)
 *
 * 배분 비율: 서론 15% / 본론 70% / 결론 15%
 */
export function calculateRecommendedAmount(
  project: Pick<Project, 'targetAmountNum' | 'targetUnit'>
): RecommendedAmount {
  const { targetAmountNum, targetUnit } = project;
  // targetUnit이 없는 레거시 데이터는 'words'로 처리
  const unit = targetUnit ?? 'words';

  let total = 0;
  let resultUnit: 'words' | 'characters' = 'words';
  let label = '단어';
  let pageNote: string | undefined;

  if (unit === 'characters') {
    total = (targetAmountNum && targetAmountNum > 0) ? targetAmountNum : 6000;
    resultUnit = 'characters';
    label = '자';
  } else if (unit === 'pages') {
    const pages = (targetAmountNum && targetAmountNum > 0) ? targetAmountNum : 4;
    total = pages * 500;
    resultUnit = 'words';
    label = '단어';
    pageNote = `${pages}페이지 기준 약 ${total.toLocaleString()}단어`;
  } else {
    // 'words'
    total = (targetAmountNum && targetAmountNum > 0) ? targetAmountNum : 2000;
    resultUnit = 'words';
    label = '단어';
  }

  const intro = Math.round(total * 0.15);
  const conclusion = Math.round(total * 0.15);
  const body = total - intro - conclusion; // 나머지를 본론에 배정 (반올림 오차 방지)

  return { unit: resultUnit, total, intro, body, conclusion, label, pageNote };
}

/**
 * 레거시 호환: 단어 수 기반 권장 분량 계산 (pages/words 지원)
 * @deprecated calculateRecommendedAmount를 사용하세요.
 */
export function calculateRecommendedWords(
  project: Pick<Project, 'targetAmountNum' | 'targetUnit'>
): { total: number; intro: number; body: number; conclusion: number } {
  const result = calculateRecommendedAmount(project);
  return { total: result.total, intro: result.intro, body: result.body, conclusion: result.conclusion };
}
