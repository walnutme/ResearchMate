import { User, Project, Mission, Source, ClaimNode, Draft, CommunityPost, PeerReview } from '../types';
import { mockSources, mockClaims, mockCommunityPosts, mockPeerReviews } from './mockData';
import { generateMissions, getInitialWorkspaceAndCriteria } from './missionGenerator';

export interface UserData {
  userProfile: {
    id: string;
    name: string;
    email: string;
    academicLevel: 'undergrad' | 'undergrad_researcher' | 'grad';
    field: string;
    language: 'ko' | 'en' | 'both';
  };
  projects: Project[];
  activeProjectId: string | null;
  missionsByProject: Record<string, Mission[]>;
  sourcesByProject: Record<string, Source[]>;
  claimsByProject: Record<string, ClaimNode[]>;
  draftByProject: Record<string, Draft>;
  peerReviewsByProject: Record<string, PeerReview[]>;
  finalChecksByProject: Record<string, any>;
  progressHistoryByProject: Record<string, Array<{ name: string; date: string; progress: number; label?: string }>>;
  communityPosts: CommunityPost[];
  points: number;
  deposit: number;
  streak: number;
  longestStreak: number;
  completedMissionCount: number;
  achievements: string[];
}

const USER_DATA_PREFIX = 'researchMate_data_';

export function checkAchievementsAwarded(
  currentAchievements: string[],
  stats: {
    streak: number;
    sourcesCount: number;
    peerReviewsCount: number;
    hasFinalCheck: boolean;
  }
): string[] {
  const achievements = [...(currentAchievements || [])];
  
  // 1. 3일 연속 미션 완료
  if (stats.streak >= 3 && !achievements.includes('streak_3')) {
    achievements.push('streak_3');
  }
  
  // 2. 첫 자료 정리 완료
  if (stats.sourcesCount >= 1 && !achievements.includes('first_source')) {
    achievements.push('first_source');
  }
  
  // 3. 첫 Peer Review 완료
  if (stats.peerReviewsCount >= 1 && !achievements.includes('first_review')) {
    achievements.push('first_review');
  }

  // 4. 최종본 완성 (final check가 있고, readinessScore >= 80인 경우 등)
  if (stats.hasFinalCheck && !achievements.includes('final_complete')) {
    achievements.push('final_complete');
  }

  return achievements;
}

// Retrieve all user data from localStorage
export function getUserData(userId: string): UserData | null {
  try {
    const rawData = localStorage.getItem(`${USER_DATA_PREFIX}${userId}`);
    if (!rawData) return null;
    return JSON.parse(rawData);
  } catch (e) {
    console.error(`Error loading user data for ${userId}:`, e);
    return null;
  }
}

// Save user data to localStorage
export function saveUserData(userId: string, data: UserData): void {
  try {
    localStorage.setItem(`${USER_DATA_PREFIX}${userId}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving user data for ${userId}:`, e);
  }
}

// Get the active project for a user
export function getActiveProject(userId: string): Project | null {
  const data = getUserData(userId);
  if (!data || !data.activeProjectId) return null;
  const project = data.projects.find(p => p.id === data.activeProjectId);
  return project || null;
}

// Set the active project for a user
export function setActiveProject(userId: string, projectId: string): UserData | null {
  const data = getUserData(userId);
  if (!data) return null;
  const exists = data.projects.some(p => p.id === projectId);
  if (exists) {
    data.activeProjectId = projectId;
    saveUserData(userId, data);
  }
  return data;
}

// Create a new project for a user
export function createProjectForUser(userId: string, project: Project): UserData {
  let data = getUserData(userId);
  
  if (!data) {
    // Fallback if no data is found
    data = {
      userProfile: {
        id: userId,
        name: '사용자',
        academicLevel: 'undergrad',
        field: '기타',
        language: 'ko',
        email: ''
      },
      projects: [],
      activeProjectId: null,
      missionsByProject: {},
      sourcesByProject: {},
      claimsByProject: {},
      draftByProject: {},
      peerReviewsByProject: {},
      finalChecksByProject: {},
      points: 0,
      deposit: 0,
      streak: 0,
      achievements: [],
      communityPosts: []
    };
  }

  const projectId = `p-${Date.now()}`;
  const projectWithId = { ...project, id: projectId };
  const initialMissions = generateMissions(projectWithId);

  data.projects.push(projectWithId);
  data.activeProjectId = projectId;
  
  data.missionsByProject[projectId] = initialMissions;
  data.sourcesByProject[projectId] = [];
  data.claimsByProject[projectId] = [];
  data.draftByProject[projectId] = {
    introText: '',
    bodyText: '',
    conclusionText: '',
    introProgress: 0,
    bodyProgress: 0,
    conclusionProgress: 0
  };
  data.peerReviewsByProject[projectId] = [];
  data.finalChecksByProject[projectId] = null;

  data.deposit = project.deposit || 10000;
  data.streak = 0;

  saveUserData(userId, data);
  return data;
}

// Initialize default user data for a new signup
export function initializeNewUserData(user: User): UserData {
  return {
    userProfile: {
      id: user.id || '',
      name: user.name,
      email: user.email || '',
      academicLevel: user.level,
      field: user.major,
      language: user.language
    },
    projects: [],
    activeProjectId: null,
    missionsByProject: {},
    sourcesByProject: {},
    claimsByProject: {},
    draftByProject: {},
    peerReviewsByProject: {},
    finalChecksByProject: {},
    progressHistoryByProject: {},
    communityPosts: [], // Clean slate by default for real users
    points: 0,
    deposit: 0,
    streak: 0,
    longestStreak: 0,
    completedMissionCount: 0,
    achievements: []
  };
}

// Demo data generators
export function createDemoUser1Data(user: User): UserData {
  const projectId = 'p-demo1';
  const project: Project = {
    id: projectId,
    type: 'thesis',
    topic: '현대 영미문학 작품 속 인물의 정체성 형성',
    major: '인문학',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
    targetAmount: '12 pages',
    targetAmountNum: 12,
    targetUnit: 'pages',
    language: '한국어',
    currentStatus: 'data_collection',
    citationStyle: 'MLA',
    format: 'PDF',
    dailyWorkTime: '1h',
    deposit: 10000,
    selectedPlan: 'complete'
  };

  const rawMissions1 = [
    { id: 'm1-1', title: '대표 영미소설 3편 선정 및 1차 독해', type: 'reading', amount: '3편', duration: 90, status: 'completed' as const, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'm1-2', title: '정체성 형성 이론 선행연구 요약', type: 'organizing', amount: '2편 요약', duration: 60, status: 'completed' as const, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'm1-3', title: '서론 초안 작성 및 핵심 질문 구체화', type: 'writing', amount: '1페이지', duration: 45, status: 'delayed' as const, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'm1-4', title: '작품 속 인물의 심리적 변화 양상 분석', type: 'writing', amount: '1페이지', duration: 60, status: 'pending' as const, date: new Date(Date.now()).toISOString().split('T')[0] },
    { id: 'm1-5', title: '인용 문헌 정보 정리 및 서식 검토', type: 'organizing', amount: '5개 정리', duration: 30, status: 'pending' as const, date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'm1-6', title: '선행연구 한계점 비판적 분석', type: 'feedback', amount: '1문단 작성', duration: 45, status: 'pending' as const, date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
  ];

  const missions: Mission[] = rawMissions1.map(m => {
    const { workspaceData, completionCriteria } = getInitialWorkspaceAndCriteria(m.type as any, m.amount);
    return {
      ...m,
      projectId,
      description: `${m.title} 미션입니다.`,
      targetAmount: m.amount,
      estimatedMinutes: m.duration,
      progress: m.status === 'completed' ? 100 : 0,
      workspaceData,
      completionCriteria,
    };
  });

  return {
    userProfile: {
      id: user.id || 'u-demo1',
      name: user.name,
      email: user.email || 'demo1@researchmate.app',
      academicLevel: user.level,
      field: user.major,
      language: user.language
    },
    projects: [project],
    activeProjectId: projectId,
    missionsByProject: {
      [projectId]: missions
    },
    sourcesByProject: {
      [projectId]: [...mockSources]
    },
    claimsByProject: {
      [projectId]: [...mockClaims]
    },
    draftByProject: {
      [projectId]: {
        introText: '현대 영미 소설에서 인물의 정체성 형성은 사회적 억압과 개인적 투쟁의 교차점 속에서 다층적으로 발현된다. 본 연구는 특히 20세기 초 자전적 경향을 띄는 주요 텍스트를 중심으로...',
        bodyText: '',
        conclusionText: '',
        introProgress: 40,
        bodyProgress: 0,
        conclusionProgress: 0
      }
    },
    peerReviewsByProject: {
      [projectId]: []
    },
    finalChecksByProject: {
      [projectId]: null
    },
    progressHistoryByProject: {
      [projectId]: [
        { name: 'D-9', date: 'D-9', progress: 10, label: '자료수집 시작' },
        { name: 'D-8', date: 'D-8', progress: 18, label: '논문 요약 완료' },
        { name: 'D-7', date: 'D-7', progress: 25, label: '아규먼트 빌드' },
        { name: 'D-6', date: 'D-6', progress: 32, label: '서론 작성 중' }
      ]
    },
    points: 800,
    deposit: 9500, // 1 delayed penalty
    streak: 0,
    longestStreak: 3,
    completedMissionCount: 2,
    achievements: ['first_source'],
    communityPosts: [...mockCommunityPosts] // Demo users have preloaded posts
  };
}

export function createDemoUser2Data(user: User): UserData {
  const projectId = 'p-demo2';
  const project: Project = {
    id: projectId,
    type: 'research_paper',
    topic: '글로벌 기후 금융 거버넌스',
    major: '국제학',
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8 days from now
    targetAmount: '15 pages',
    targetAmountNum: 15,
    targetUnit: 'pages',
    language: '한국어',
    currentStatus: 'drafting',
    citationStyle: 'APA',
    format: 'PDF',
    dailyWorkTime: '2h_plus',
    deposit: 15000,
    selectedPlan: 'complete'
  };

  const rawMissions2 = [
    { id: 'm2-1', title: '기후 금융 관련 협약 선행 논문 5편 독해', type: 'reading', amount: '5편', duration: 120, status: 'completed' as const, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'm2-2', title: '거버넌스 체계 비교 분석 프레임워크 설계', type: 'organizing', amount: '1개 설계', duration: 60, status: 'completed' as const, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'm2-3', title: '서론 및 선행연구 검토 단락 집필', type: 'writing', amount: '2페이지', duration: 90, status: 'completed' as const, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'm2-4', title: '본론 기후재원 흐름 통계 수치 시각화', type: 'writing', amount: '1페이지', duration: 60, status: 'completed' as const, date: new Date(Date.now()).toISOString().split('T')[0] },
    { id: 'm2-5', title: '동료 연구원 피드백 반영 수정', type: 'revision', amount: '전체 수정', duration: 90, status: 'pending' as const, date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: 'm2-6', title: '결론 제언 파트 작성 및 마무리', type: 'writing', amount: '1페이지', duration: 60, status: 'pending' as const, date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
  ];

  const missions: Mission[] = rawMissions2.map(m => {
    const { workspaceData, completionCriteria } = getInitialWorkspaceAndCriteria(m.type as any, m.amount);
    return {
      ...m,
      projectId,
      description: `${m.title} 미션입니다.`,
      targetAmount: m.amount,
      estimatedMinutes: m.duration,
      progress: m.status === 'completed' ? 100 : 0,
      workspaceData,
      completionCriteria,
    };
  });

  const customSources = [
    ...mockSources,
    {
      id: 's4',
      title: 'Global Climate Finance Governance and Its Challenges',
      author: 'Miller, J. & Watson, K.',
      year: '2023',
      mainClaim: 'Multilateral climate funds have high bureaucracy, delaying disbursement by an average of 18 months.',
      quotation: 'Improving fund accessibility requires simplified accreditation processes.',
      doiOrUrl: 'https://doi.org/10.1016/j.envsci.2023.03.004',
      keywords: ['climate finance', 'governance', 'bureaucracy'],
      section: 'body' as const,
      completeness: 100
    }
  ];

  const customClaims = [
    ...mockClaims,
    {
      id: 'c5',
      type: 'claim' as const,
      text: '글로벌 기후 금융은 다자간 기금의 다변화로 인해 자원의 효율적 배분이 왜곡되고 있다.'
    }
  ];

  return {
    userProfile: {
      id: user.id || 'u-demo2',
      name: user.name,
      email: user.email || 'demo2@researchmate.app',
      academicLevel: user.level,
      field: user.major,
      language: user.language
    },
    projects: [project],
    activeProjectId: projectId,
    missionsByProject: {
      [projectId]: missions
    },
    sourcesByProject: {
      [projectId]: customSources
    },
    claimsByProject: {
      [projectId]: customClaims
    },
    draftByProject: {
      [projectId]: {
        introText: '글로벌 기후위기 대응을 위한 기후 재원의 효율적 집행은 거버넌스의 구조적 신뢰도에 의존한다. 특히 파리협정 이후 재정 지원 경로의 공정성과 투명성은 주요 쟁점으로 떠올랐다.',
        bodyText: '특히 다자간 기부 기금의 파편화(fragmentation)는 수원국의 행정 부담을 가중시키며 수원국 자원의 배분을 왜곡하고 실질적 집행을 18개월 이상 지연시키는 결과를 낳는다(Miller & Watson, 2023).',
        conclusionText: '',
        introProgress: 85,
        bodyProgress: 40,
        conclusionProgress: 0
      }
    },
    peerReviewsByProject: {
      [projectId]: [...mockPeerReviews]
    },
    finalChecksByProject: {
      [projectId]: null
    },
    progressHistoryByProject: {
      [projectId]: [
        { name: 'D-9', date: 'D-9', progress: 10, label: '자료수집 시작' },
        { name: 'D-8', date: 'D-8', progress: 18, label: '논문 요약 완료' },
        { name: 'D-7', date: 'D-7', progress: 25, label: '아규먼트 빌드' },
        { name: 'D-6', date: 'D-6', progress: 32, label: '서론 작성 중' },
        { name: 'D-5', date: 'D-5', progress: 42, label: '본론 1 집필' },
        { name: 'D-4', date: 'D-4', progress: 50, label: '본론 2 집필' },
        { name: 'D-3', date: 'D-3', progress: 58, label: '피어 리뷰 등록' },
        { name: 'D-2', date: 'D-2', progress: 75, label: '결론 작성' }
      ]
    },
    points: 2500,
    deposit: 15000,
    streak: 5,
    longestStreak: 7,
    completedMissionCount: 4,
    achievements: ['streak_3', 'first_source', 'first_review'],
    communityPosts: [...mockCommunityPosts] // Demo users have preloaded posts
  };
}

const SCHEMA_VERSION_KEY = 'researchMate_schemaVersion';
const CURRENT_SCHEMA_VERSION = 'v4';

/**
 * 안전한 스키마 마이그레이션 함수.
 * 절대로 researchMate_users 또는 researchMate_data_* 키를 삭제하지 않습니다.
 * 누락된 필드만 보완합니다.
 */
export function checkAndMigrateSchema(): void {
  const currentVersion = localStorage.getItem(SCHEMA_VERSION_KEY);
  if (currentVersion === CURRENT_SCHEMA_VERSION) return;

  // 이전 버전(v1, v2, v3 또는 미설정)에서 안전하게 마이그레이션
  // 사용자 데이터와 사용자 목록은 절대 삭제하지 않음
  try {
    // 구버전 레거시 키(research_mate_ 접두어 사용) 만 제거 - researchMate_는 절대 삭제 안 함
    const legacyKeysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('research_mate_')) {
        legacyKeysToRemove.push(key);
      }
    }
    legacyKeysToRemove.forEach(key => localStorage.removeItem(key));

    // 각 사용자 데이터에 누락된 필드 보완 (삭제 없이 추가만)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('researchMate_data_')) {
        try {
          const raw = localStorage.getItem(key);
          if (!raw) continue;
          const data: any = JSON.parse(raw);

          // finalChecksByProject 누락 시 기본값
          if (!data.finalChecksByProject) data.finalChecksByProject = {};
          // inventory 누락 시 기본값
          if (!data.inventory) data.inventory = [];
          // achievements 누락 시 기본값  
          if (!data.achievements) data.achievements = [];
          // communityPosts 누락 시 기본값
          if (!data.communityPosts) data.communityPosts = [];

          // 신규 필드 누락 시 기본값
          if (data.streak === undefined) data.streak = 0;
          if (data.longestStreak === undefined) data.longestStreak = 0;
          if (data.completedMissionCount === undefined) data.completedMissionCount = 0;
          if (!data.progressHistoryByProject) data.progressHistoryByProject = {};

          // 일반 사용자 마이그레이션 (데모 사용자가 아닌 경우 잘못 적재된 데모 데이터 정제)
          const email = data.userProfile?.email;
          const isDemo = email === 'demo1@researchmate.app' || email === 'demo2@researchmate.app';
          if (!isDemo) {
            // 실제 완료된 미션 개수 집계
            let actualCompletedCount = 0;
            const projectMissions = data.missionsByProject || {};
            for (const pId in projectMissions) {
              if (Array.isArray(projectMissions[pId])) {
                actualCompletedCount += projectMissions[pId].filter((m: any) => m.status === 'completed').length;
              }
            }
            data.completedMissionCount = actualCompletedCount;

            // 프로젝트가 없거나 실제 완료된 미션이 없는데 streak가 들어가 있으면 리셋
            if (!data.projects || data.projects.length === 0 || actualCompletedCount === 0) {
              data.streak = 0;
              data.longestStreak = 0;
            } else {
              // 실제 완료된 미션 개수를 기준으로 streak 한도 초과분 보정
              if (data.streak > actualCompletedCount) {
                data.streak = actualCompletedCount;
              }
              if (data.longestStreak > actualCompletedCount) {
                data.longestStreak = actualCompletedCount;
              }
            }

            // activeProjectId가 없는데 progressHistoryByProject가 존재하면 비우기
            if (!data.activeProjectId) {
              data.progressHistoryByProject = {};
            } else {
              // 유효하지 않은 프로젝트 ID의 progressHistory 삭제
              for (const pId in data.progressHistoryByProject) {
                if (!data.projects || !data.projects.some((p: any) => p.id === pId)) {
                  delete data.progressHistoryByProject[pId];
                }
              }
            }

            // 미션이 모두 pending이거나 완료된 미션이 없는데 progressHistory가 남아있으면 리셋
            if (data.activeProjectId && data.missionsByProject[data.activeProjectId]) {
              const activeMissions = data.missionsByProject[data.activeProjectId];
              const completedCountInActive = activeMissions.filter((m: any) => m.status === 'completed').length;
              const hasOnlyPending = activeMissions.every((m: any) => m.status === 'pending');
              
              if (hasOnlyPending || completedCountInActive === 0) {
                data.progressHistoryByProject[data.activeProjectId] = [];
              }
            }

            // achievements 검증 및 재산출
            const validatedAchievements: string[] = [];
            const activeProjId = data.activeProjectId;
            const sourcesCount = activeProjId && data.sourcesByProject[activeProjId] ? data.sourcesByProject[activeProjId].length : 0;
            const peerReviewsCount = activeProjId && data.peerReviewsByProject[activeProjId] ? data.peerReviewsByProject[activeProjId].length : 0;
            const hasFinalCheck = activeProjId && data.finalChecksByProject && data.finalChecksByProject[activeProjId] ? true : false;

            if (data.streak >= 3) validatedAchievements.push('streak_3');
            if (sourcesCount >= 1) validatedAchievements.push('first_source');
            if (peerReviewsCount >= 1) validatedAchievements.push('first_review');
            if (hasFinalCheck) validatedAchievements.push('final_complete');

            data.achievements = validatedAchievements;
          }

          // 각 프로젝트에 language 필드 누락 시 기본값
          if (Array.isArray(data.projects)) {
            data.projects = data.projects.map((p: any) => ({
              ...p,
              language: p.language ?? '한국어',
              targetAmountNum: p.targetAmountNum ?? 4,
              targetUnit: p.targetUnit ?? 'pages',
            }));
          }

          localStorage.setItem(key, JSON.stringify(data));
        } catch {
          // 개별 데이터 파싱 실패 시 무시하고 계속
        }
      }
    }
  } catch (e) {
    console.error('Migration error (non-fatal):', e);
  }

  localStorage.setItem(SCHEMA_VERSION_KEY, CURRENT_SCHEMA_VERSION);
}
