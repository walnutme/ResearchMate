import { CommunityPost, PeerReview, Source, ClaimNode, Mission } from '../types';

export const mockSources: Source[] = [
  {
    id: 's1',
    title: '인공지능의 학술적 글쓰기 지원 효과성 연구',
    author: '김철수, 이영희',
    year: '2024',
    mainClaim: 'AI 기반 피드백은 연구자의 글쓰기 자신감을 향상시키지만 최종 논리의 정교성에는 직접적인 동료 피드백이 더 효과적이다.',
    quotation: '초안 검토 단계에서 AI가 표현 교정을 돕고, 동료 검토가 논리적 타당성을 점검할 때 글쓰기 완성도가 34% 증가했다.',
    doiOrUrl: 'https://doi.org/10.1234/jkse.2024.12.3.45',
    keywords: ['인공지능', '학술 글쓰기', '동료 피드백'],
    section: 'intro',
    completeness: 100,
  },
  {
    id: 's2',
    title: '대학원생의 연구 마감 관리와 학업 성과',
    author: 'Park, J. & Smith, A.',
    year: '2023',
    mainClaim: '마감 직전 몰아서 집필하는 대학원생보다 매일 정해진 분량을 작성하는 연구자의 논문 통과율이 2.5배 높다.',
    quotation: 'Daily micro-writing targets significantly reduce academic anxiety and prevent the cognitive overload of marathon writing sessions.',
    doiOrUrl: '', // DOI/URL 없음 -> 출처 정보 부족 배지
    keywords: ['마감 관리', '대학원 생활', '집필 패턴'],
    section: 'body',
    completeness: 60,
  },
  {
    id: 's3',
    title: 'Peer Review 시스템의 신뢰도 향상을 위한 보상 구조 설계',
    author: '최현우',
    year: '2025',
    mainClaim: '피어 리뷰의 성실도에 비례해 토큰을 부여하는 모델은 무성의한 피드백을 방지하고 질적 완성도를 높인다.',
    quotation: '보상 구조가 결합된 리뷰 집단에서 구체적인 텍스트 근거를 제시한 피드백 비율이 45% 증가했다.',
    doiOrUrl: 'https://scholar.google.com/peer-review-rewards',
    keywords: ['Peer Review', '보상 구조', '커뮤니티 신뢰도'],
    section: 'body',
    completeness: 100,
  }
];

export const mockClaims: ClaimNode[] = [
  {
    id: 'c1',
    type: 'claim',
    text: '연구 글쓰기에 보상 구조를 적용한 데일리 미션은 집필의 지속성을 극대화한다.',
  },
  {
    id: 'c2',
    type: 'evidence',
    text: '최현우(2025)의 연구에 따르면, 보상이 결합된 집단에서 성실 피드백과 참여 지속도가 약 45% 향상되었다.',
    connectedTo: 'c1',
    sourceIds: ['s3'],
  },
  {
    id: 'c3',
    type: 'counter',
    text: '외재적 보상(포인트 등)은 사용자의 내재적 연구 동기를 저해할 수 있다.',
    connectedTo: 'c1',
  },
  {
    id: 'c4',
    type: 'rebuttal',
    text: '그러나 단순 보상이 아닌 Peer Review 질 향상권, AI 점검권 등 연구 효율성을 직접 돕는 서비스 혜택으로 포인트를 환원하므로 내재적 학업 성취욕구와 결합된다.',
    connectedTo: 'c3',
    sourceIds: ['s1'],
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'p1',
    category: '사회과학',
    projectType: '개인 논문',
    title: '설문조사 표본 수 150명으로 논문 작성 가능할까요?',
    content: '회귀분석을 돌리려고 하는데 표본 수가 150명입니다. 변수가 5개인데 이 정도 표본으로 다중공선성이나 신뢰도에 큰 문제가 발생하지 않을지 걱정됩니다. 선행연구들은 보통 250명 이상이던데, 150명으로 적절히 방어할 수 있는 통계적 근거 논문이 있을까요?',
    createdAt: '2026-06-16T10:30:00Z',
    repliesCount: 2,
    rewardPoints: 200,
    resolved: true,
    trustTag: 'evidence-backed',
    replies: [
      {
        id: 'r1_1',
        author: '홍길동',
        authorLevel: '대학원생 (박사과정)',
        content: '독립변수 5개에 표본 150명이면 G*Power 프로그램으로 사후 검정력 분석(Post-hoc Power Analysis)을 돌렸을 때 충분히 효과 크기를 입증할 수 있습니다. Cohen(1988)의 공식 기준으로 중간 효과 크기(f2 = 0.15)일 때 검정력 0.8을 넘기기 위한 최소 표본은 약 92명입니다. 통계 방법론 챕터에서 이 검정력 수치를 함께 제시하면 심사위원들도 충분히 납득합니다.',
        createdAt: '2026-06-16T11:15:00Z',
        votes: 12,
        pointsAwarded: 200,
        accepted: true,
      },
      {
        id: 'r1_2',
        author: '이영수',
        authorLevel: '학부 연구생',
        content: '저도 비슷한 인원수로 진행했는데, 통계 프로그램 돌릴 때 다중공선성(VIF) 수치가 10 이하로 나오는지만 잘 보여줘도 무방했습니다.',
        createdAt: '2026-06-16T12:00:00Z',
        votes: 2,
        pointsAwarded: 0,
        accepted: false,
      }
    ]
  },
  {
    id: 'p2',
    category: '공학',
    projectType: '연구보고서',
    title: 'IEEE 인용 양식에서 여러 논문을 동시에 인용할 때 포맷 질문',
    content: 'IEEE 스타일에서 대괄호 안에 세 개의 논문을 인용하려고 합니다. [1], [2], [3]과 같이 각각 따로 써야 하나요, 아니면 [1-3]이나 [1, 2, 3]으로 묶어 써야 하나요? 학회 템플릿 마다 설명이 달라 혼란스럽습니다.',
    createdAt: '2026-06-17T14:20:00Z',
    repliesCount: 1,
    rewardPoints: 100,
    resolved: true,
    trustTag: 'evidence-backed',
    replies: [
      {
        id: 'r2_1',
        author: 'Sarah Kang',
        authorLevel: '대학원생 (석사과정)',
        content: 'IEEE 공식 스타일 매뉴얼에 따르면 여러 참고문헌을 인용할 때는 각 문헌의 대괄호를 개별적으로 표시해야 합니다. 예를 들어 [1], [2] 또는 [1]-[3] 처럼 적어야 합니다. [1, 2]나 [1-3]과 같이 하나의 대괄호 안에 쉼표나 하이픈으로 숫자를 나열하는 것은 IEEE 공식 포맷이 아닙니다.',
        createdAt: '2026-06-17T15:00:00Z',
        votes: 8,
        pointsAwarded: 100,
        accepted: true,
      }
    ]
  },
  {
    id: 'p3',
    category: '인문학',
    projectType: '레포트',
    title: '연구 대상 텍스트의 시대적 배경 설정 질문',
    content: '19세기 초반 영미 소설을 연구하는데, 당시 산업혁명기 급격한 계급 변동과 낭만주의 시문학의 유기적 결합을 설명하고 싶습니다. 역사적 사료와 문학 분석 중 어느 쪽에 무게를 실어야 서론의 논리 전개가 매끄러울까요?',
    createdAt: '2026-06-18T01:10:00Z',
    repliesCount: 0,
    rewardPoints: 150,
    resolved: false,
    trustTag: 'needs-verification',
    replies: []
  }
];

export const mockPeerReviews: PeerReview[] = [
  {
    id: 'pr1',
    projectId: 'p-demo2',
    reviewerName: '박동훈 교수',
    reviewerLevel: 'grad',
    logicalValidity: 5,
    sourceRelevance: 4,
    academicFormatting: 5,
    comments: '전반적으로 논증의 흐름과 통계적 증거 배치는 매우 훌륭합니다. 다만, 본론 제2문단에서 3문단으로 넘어갈 때 산업혁명기 역사적 사료의 직접적 인용이 다소 급작스럽게 등장합니다. 두 문단 사이에 인과적 연결 문장을 한 줄 추가하여 독자가 흐름을 잃지 않게 조정해주세요. 또한 결론에서 연구의 한계점과 향후 기여 방안이 단 한 문장으로 매우 짧게 마무리되어 있는데, 이를 보강하여 심사 완성도를 높여야 합니다.',
    trustTag: 'evidence-backed',
    referenceLink: 'https://doi.org/10.1234/jkse.2024.12.3.45',
    createdAt: '2026-06-17T09:00:00Z'
  }
];
export const mockPeerGroups = [
  { name: '이현우', level: '학부 연구생', major: '사회과학', matchingRate: 95 },
  { name: 'Dr. John Miller', level: '박사후 연구원', major: '국제학', matchingRate: 88 },
  { name: '한소희', level: '대학원생 (석사)', major: '인문학', matchingRate: 92 },
  { name: '김민준', level: '학부생 (4학년)', major: '공학', matchingRate: 85 }
];
