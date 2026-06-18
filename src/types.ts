export interface User {
  id?: string;
  email?: string;
  password?: string;
  name: string;
  level: 'undergrad' | 'undergrad_researcher' | 'grad'; // 학부생, 학부 연구생, 대학원생
  major: string; // 인문학, 사회과학, 국제학, 자연과학, 공학, 예술/디자인, 기타
  language: 'ko' | 'en' | 'both'; // 한국어, 영어, 한국어+영어
}

export type AssignmentType = 'thesis' | 'report' | 'research_paper' | 'team_report'; // 개인 논문, 레포트, 연구보고서, 팀플 보고서
export type CurrentStatusType = 'topic_exploration' | 'data_collection' | 'outline' | 'drafting' | 'revision'; // 주제 탐색 중, 자료 수집 중, 개요 작성 중, 초안 작성 중, 수정 중
export type CitationStyleType = 'APA' | 'MLA' | 'Chicago' | 'IEEE' | 'other';
export type FileFormatType = 'PDF' | 'DOCX' | 'PPTX' | 'other';
export type DailyWorkTimeType = '15m' | '30m' | '1h' | '2h_plus';

export type ProjectLanguage =
  | '한국어'
  | '영어'
  | '한국어+영어'
  | '일본어'
  | '중국어(간체)'
  | '중국어(번체)'
  | '스페인어'
  | '프랑스어'
  | '독일어'
  | '포르투갈어'
  | '아랍어'
  | '러시아어'
  | '기타';

export interface Project {
  id?: string;
  type: AssignmentType;
  topic: string;
  major: string;
  deadline: string; // YYYY-MM-DD
  targetAmount: string; // e.g. "10 pages", "3000 words", "6000 characters" (레거시 호환)
  targetAmountNum: number; // 목표 분량 숫자값
  targetUnit: 'pages' | 'words' | 'characters'; // 목표 분량 단위
  language: ProjectLanguage; // 과제별 작성 언어
  currentStatus: CurrentStatusType;
  citationStyle: CitationStyleType;
  format: FileFormatType;
  dailyWorkTime: DailyWorkTimeType;
  deposit: number;
  selectedPlan?: 'minimal' | 'complete'; // 현실적인 최소 목표 플랜, 완성도 높은 집중 플랜
}

export type MissionType = 'reading' | 'writing' | 'organizing' | 'revision' | 'feedback'; // 읽기 / 쓰기 / 정리 / 수정 / 피드백

export interface MissionWorkspaceData {
  text?: string;
  sections?: Record<string, string>;
  notes?: any[];
  checklist?: Array<{ id: string; label: string; checked: boolean }>;
  sources?: any[];
}

export interface MissionCompletionCriteria {
  minCharacters?: number;
  minSectionsCompleted?: number;
  minSources?: number;
  minChecklistRate?: number;
  minNotes?: number;
}

export interface Mission {
  id: string;
  projectId: string;
  title: string;
  description: string;
  type: MissionType;
  amount: string; // e.g. "논문 2편", "1페이지", "개요 완성" (Keep for compatibility)
  targetAmount: string; // e.g. "논문 2편", "1페이지", "개요 완성"
  duration: number; // Keep for compatibility
  estimatedMinutes: number; // 예상 소요 시간 (분)
  status: 'pending' | 'inProgress' | 'readyToComplete' | 'completed' | 'delayed';
  progress: number; // 0 to 100
  workspaceData: MissionWorkspaceData;
  completionCriteria: MissionCompletionCriteria;
  completedAt?: string;
  updatedAt?: string;
  date: string; // YYYY-MM-DD
}

export interface Source {
  id: string;
  title: string;
  author: string;
  year: string;
  mainClaim: string;
  quotation: string;
  doiOrUrl?: string;
  keywords: string[];
  section: 'intro' | 'body' | 'conclusion'; // 사용할 위치
  completeness: number; // 인용 정보 완성도 (0 ~ 100)
}

export type ClaimType = 'claim' | 'evidence' | 'counter' | 'rebuttal';

export interface ClaimNode {
  id: string;
  type: ClaimType;
  text: string;
  connectedTo?: string; // 다른 노드의 ID (예: evidence -> claim, rebuttal -> counter)
  sourceIds?: string[]; // 연결된 출처 ID들
}

export interface Draft {
  introText: string;
  bodyText: string;
  conclusionText: string;
  introProgress: number; // 0 ~ 100
  bodyProgress: number; // 0 ~ 100
  conclusionProgress: number; // 0 ~ 100
}

export interface CommunityReply {
  id: string;
  author: string;
  authorLevel: string;
  content: string;
  createdAt: string;
  votes: number;
  pointsAwarded: number;
  accepted: boolean;
}

export interface CommunityPost {
  id: string;
  category: string; // 분야
  projectType: string; // 과제 유형
  title: string;
  content: string;
  createdAt: string;
  repliesCount: number;
  rewardPoints: number;
  resolved: boolean;
  trustTag: 'evidence-backed' | 'experience-based' | 'needs-verification'; // 근거 있음, 경험 기반, 추가 확인 필요
  replies: CommunityReply[];
}

export interface PeerReview {
  id: string;
  projectId?: string;
  reviewerName: string;
  reviewerLevel: string;
  logicalValidity: number;
  sourceRelevance: number;
  academicFormatting: number;
  comments: string;
  trustTag: 'evidence-backed' | 'experience-based' | 'needs-verification';
  referenceLink?: string;
  createdAt: string;
}

export interface AppState {
  user: User | null;
  project: Project | null;
  missions: Mission[];
  sources: Source[];
  claims: ClaimNode[];
  draft: Draft;
  communityPosts: CommunityPost[];
  peerReviews: PeerReview[];
  points: number;
  deposit: number;
  streak: number;
  longestStreak: number;
  completedMissionCount: number;
  progressHistoryByProject: Record<string, Array<{ name: string; date: string; progress: number; label?: string }>>;
  inventory: string[];
  achievements: string[];
}

// ─── Final Check ───────────────────────────────────────────────────────────
export interface FinalCheckLogicResult {
  score: number;
  status: 'good' | 'needsWork' | 'insufficient';
  feedback: string[];
}

export interface SimilarityRiskResult {
  status: 'notChecked' | 'low' | 'needsReview';
  feedback: string[];
  disclaimer: string;
}

export interface FinalCheckResult {
  checkedAt: string;
  contentHash: string;
  totalCharacters: number;
  sectionsCompleted: number;       // 0~3: 서론/본론/결론
  sourceCount: number;
  citationCompleteness: number;    // 0~100 average
  readinessScore: number | null;   // null when content is insufficient
  logicFlow: FinalCheckLogicResult;
  citationCheck: {
    status: 'good' | 'needsWork' | 'insufficient';
    missingSources: string[];
    feedback: string[];
  };
  expressionCheck: FinalCheckLogicResult;
  similarityRisk: SimilarityRiskResult;
  isStale: boolean;
}
