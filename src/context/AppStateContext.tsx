import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, User, Project, Mission, Source, ClaimNode, Draft, CommunityPost, PeerReview, CommunityReply, FinalCheckResult, ProjectLanguage } from '../types';
import { generateMissions, calculateMissionProgress, getInitialWorkspaceAndCriteria } from '../lib/missionGenerator';
import { useAuth } from './AuthContext';
import { getUserData, saveUserData, initializeNewUserData, checkAchievementsAwarded } from '../lib/userData';

// 기존 project 데이터에 누락된 필드를 채우는 마이그레이션
const migrateProject = (p: any, userLang?: string): Project => {
  const langMap: Record<string, ProjectLanguage> = { ko: '한국어', en: '영어', both: '한국어+영어' };
  const defaultLang: ProjectLanguage = userLang ? (langMap[userLang] ?? '한국어') : '한국어';

  let targetAmountNum = p.targetAmountNum ?? 0;
  let targetUnit: 'pages' | 'words' | 'characters' = p.targetUnit ?? 'pages';

  // targetAmount string에서 파싱 (레거시 호환)
  if (!p.targetAmountNum && p.targetAmount) {
    const m = String(p.targetAmount).match(/(\d+(\.\d+)?)/);
    if (m) targetAmountNum = parseFloat(m[1]);
    const amtStr = String(p.targetAmount).toLowerCase();
    if (amtStr.includes('character') || amtStr.includes('글자')) {
      targetUnit = 'characters';
    } else if (amtStr.includes('word') || amtStr.includes('단어')) {
      targetUnit = 'words';
    } else {
      targetUnit = 'pages';
    }
  }

  // 기본값: characters는 6000자, words는 2000단어, pages는 4페이지
  const defaultAmount = targetUnit === 'characters' ? 6000 : targetUnit === 'words' ? 2000 : 4;

  return {
    ...p,
    language: p.language ?? defaultLang,
    targetAmountNum: targetAmountNum || defaultAmount,
    targetUnit,
  } as Project;
};

interface AppContextType {
  state: AppState;
  projects: Project[];
  onboardUser: (user: User) => void;
  setupProject: (project: Project) => void;
  resetApp: () => void;
  completeMission: (id: string) => void;
  delayMission: (id: string) => void;
  replanMissions: (updatedMissions: Mission[]) => void;
  updateMissionWorkspace: (id: string, workspaceData: any) => void;
  addSource: (source: Omit<Source, 'id' | 'completeness'>) => void;
  deleteSource: (id: string) => void;
  addClaim: (claim: Omit<ClaimNode, 'id'>) => void;
  deleteClaim: (id: string) => void;
  updateDraft: (draft: Partial<Draft>) => void;
  addPost: (post: { category: string; projectType: string; title: string; content: string; rewardPoints: number }) => void;
  addReply: (postId: string, content: string) => void;
  acceptReply: (postId: string, replyId: string) => void;
  addPeerReview: (review: Omit<PeerReview, 'id' | 'createdAt'>) => void;
  purchaseItem: (cost: number, itemName: string) => boolean;
  changeProject: (projectId: string) => void;
  buyItem: (itemId: string, pointsCost: number) => void;
  refundDeposit: () => void;
  saveFinalCheck: (result: FinalCheckResult) => void;
  clearFinalCheck: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialEmptyState = (): AppState => ({
  user: null,
  project: null,
  missions: [],
  sources: [],
  claims: [],
  draft: {
    introText: '',
    bodyText: '',
    conclusionText: '',
    introProgress: 0,
    bodyProgress: 0,
    conclusionProgress: 0,
  },
  communityPosts: [],
  peerReviews: [],
  points: 0,
  deposit: 0,
  streak: 0,
  longestStreak: 0,
  completedMissionCount: 0,
  progressHistoryByProject: {},
  inventory: [],
  achievements: [],
});

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [state, setState] = useState<AppState>(initialEmptyState);
  const [projects, setProjects] = useState<Project[]>([]);

  // Load user-specific state whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      const userData = getUserData(currentUser.id);
      if (userData) {
        setProjects(userData.projects || []);
        
        const activeProjId = userData.activeProjectId;
        const rawProject = activeProjId ? (userData.projects.find((p: any) => p.id === activeProjId) || null) : null;
        const project = rawProject ? migrateProject(rawProject, userData.userProfile?.language) : null;

        const rawMissions = (activeProjId && userData.missionsByProject[activeProjId]) || [];
        const enrichedMissions = rawMissions.map((m: any) => {
          if (!m.workspaceData || !m.completionCriteria) {
            const { workspaceData, completionCriteria } = getInitialWorkspaceAndCriteria(m.type, m.amount || '');
            return {
              ...m,
              projectId: m.projectId || activeProjId || '',
              description: m.description || `${m.title} 미션입니다.`,
              targetAmount: m.targetAmount || m.amount || '',
              estimatedMinutes: m.estimatedMinutes || m.duration || 30,
              progress: m.progress || (m.status === 'completed' ? 100 : 0),
              workspaceData,
              completionCriteria,
            };
          }
          return m;
        });

        setState({
          user: {
            id: currentUser.id,
            email: currentUser.email,
            name: userData.userProfile.name || currentUser.name,
            level: userData.userProfile.academicLevel || currentUser.level,
            major: userData.userProfile.field || currentUser.major,
            language: userData.userProfile.language || currentUser.language,
          },
          project,
          missions: enrichedMissions,
          sources: (activeProjId && userData.sourcesByProject[activeProjId]) || [],
          claims: (activeProjId && userData.claimsByProject[activeProjId]) || [],
          draft: (activeProjId && userData.draftByProject[activeProjId]) || {
            introText: '',
            bodyText: '',
            conclusionText: '',
            introProgress: 0,
            bodyProgress: 0,
            conclusionProgress: 0,
          },
          communityPosts: userData.communityPosts || [],
          peerReviews: (activeProjId && userData.peerReviewsByProject[activeProjId]) || [],
          points: userData.points ?? 0,
          deposit: userData.deposit ?? 0,
          streak: userData.streak ?? 0,
          longestStreak: userData.longestStreak ?? 0,
          completedMissionCount: userData.completedMissionCount ?? 0,
          progressHistoryByProject: userData.progressHistoryByProject ?? {},
          inventory: userData.inventory || [],
          achievements: userData.achievements || [],
        });
      } else {
        // First login/registration initialization
        const newD = initializeNewUserData(currentUser);
        saveUserData(currentUser.id, newD);
        setProjects([]);
        setState({
          user: currentUser,
          project: null,
          missions: [],
          sources: [],
          claims: [],
          draft: {
            introText: '',
            bodyText: '',
            conclusionText: '',
            introProgress: 0,
            bodyProgress: 0,
            conclusionProgress: 0,
          },
          communityPosts: [],
          peerReviews: [],
          points: 0,
          deposit: 0,
          streak: 0,
          longestStreak: 0,
          completedMissionCount: 0,
          progressHistoryByProject: {},
          inventory: [],
          achievements: [],
        });
      }
    } else {
      // Clear state when logged out
      setProjects([]);
      setState(initialEmptyState());
    }
  }, [currentUser]);

  // Sync state to user-specific localStorage whenever state changes
  useEffect(() => {
    if (!currentUser || !state.user) return;

    const userData = getUserData(currentUser.id) || initializeNewUserData(currentUser);

    userData.userProfile = {
      id: currentUser.id,
      name: state.user.name,
      email: currentUser.email || '',
      academicLevel: state.user.level,
      field: state.user.major,
      language: state.user.language,
    };
    userData.points = state.points ?? 0;
    userData.deposit = state.deposit ?? 0;
    userData.streak = state.streak ?? 0;
    userData.longestStreak = state.longestStreak ?? 0;
    userData.completedMissionCount = state.completedMissionCount ?? 0;
    userData.progressHistoryByProject = state.progressHistoryByProject ?? {};
    userData.inventory = state.inventory ?? [];
    userData.achievements = state.achievements ?? [];
    userData.communityPosts = state.communityPosts ?? [];

    if (state.project && state.project.id) {
      const pId = state.project.id;
      const pIndex = userData.projects.findIndex(p => p.id === pId);
      
      if (pIndex > -1) {
        userData.projects[pIndex] = state.project;
      } else {
        userData.projects.push(state.project);
      }

      userData.activeProjectId = pId;
      userData.missionsByProject[pId] = state.missions;
      userData.sourcesByProject[pId] = state.sources;
      userData.claimsByProject[pId] = state.claims;
      userData.draftByProject[pId] = state.draft;
      userData.peerReviewsByProject[pId] = state.peerReviews;

      // Sync active projects list in state as well
      setProjects(userData.projects);
    }

    saveUserData(currentUser.id, userData);
  }, [state, currentUser]);

  const onboardUser = (user: User) => {
    setState(prev => ({ ...prev, user }));
  };

  const setupProject = (project: Project) => {
    if (!currentUser) return;
    const projectId = `p-${Date.now()}`;
    const projectWithId = { ...project, id: projectId };
    const missions = generateMissions(projectWithId);

    setState(prev => ({
      ...prev,
      project: projectWithId,
      missions,
      sources: [],
      claims: [],
      draft: {
        introText: '',
        bodyText: '',
        conclusionText: '',
        introProgress: 0,
        bodyProgress: 0,
        conclusionProgress: 0,
      },
      peerReviews: [],
      deposit: project.deposit || 10000,
      streak: 0,
      longestStreak: prev.longestStreak,
      completedMissionCount: prev.completedMissionCount,
      progressHistoryByProject: {
        ...prev.progressHistoryByProject,
        [projectId]: []
      }
    }));
  };

  const resetApp = () => {
    if (!currentUser || !state.project) return;
    const originalDeposit = state.project.deposit || 10000;
    const freshMissions = generateMissions(state.project);
    const pId = state.project.id;
    setState(prev => ({
      ...prev,
      missions: freshMissions,
      sources: [],
      claims: [],
      draft: {
        introText: '',
        bodyText: '',
        conclusionText: '',
        introProgress: 0,
        bodyProgress: 0,
        conclusionProgress: 0
      },
      peerReviews: [],
      deposit: originalDeposit,
      streak: 0,
      completedMissionCount: 0,
      progressHistoryByProject: {
        ...prev.progressHistoryByProject,
        [pId]: []
      },
      achievements: []
    }));
  };

  const changeProject = (projectId: string) => {
    if (!currentUser) return;
    const userData = getUserData(currentUser.id);
    if (!userData) return;

    const rawProject = userData.projects.find((p: any) => p.id === projectId) || null;
    if (!rawProject) return;
    const project = migrateProject(rawProject, userData.userProfile?.language);

    setState(prev => ({
      ...prev,
      project,
      missions: userData.missionsByProject[projectId] || [],
      sources: userData.sourcesByProject[projectId] || [],
      claims: userData.claimsByProject[projectId] || [],
      draft: userData.draftByProject[projectId] || {
        introText: '',
        bodyText: '',
        conclusionText: '',
        introProgress: 0,
        bodyProgress: 0,
        conclusionProgress: 0,
      },
      peerReviews: userData.peerReviewsByProject[projectId] || [],
    }));
  };

  const completeMission = (id: string) => {
    setState(prev => {
      const pId = prev.project?.id;
      if (!pId) return prev;

      const updatedMissions = prev.missions.map(m => 
        m.id === id ? { ...m, status: 'completed' as const, progress: 100, completedAt: new Date().toISOString() } : m
      );

      const totalMissions = updatedMissions.length;
      const completedMissions = updatedMissions.filter(m => m.status === 'completed').length;
      const overallProgress = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;

      const newStreak = prev.streak + 1;
      const newLongestStreak = Math.max(prev.longestStreak, newStreak);
      const newCompletedCount = prev.completedMissionCount + 1;

      // Add or update progress history entry for today
      const todayStr = new Date().toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' });
      const currentHistory = prev.progressHistoryByProject[pId] ?? [];
      
      let updatedHistory = [...currentHistory];
      const existingEntryIndex = updatedHistory.findIndex(h => h.name === todayStr || h.date === todayStr);

      if (existingEntryIndex > -1) {
        updatedHistory[existingEntryIndex] = {
          ...updatedHistory[existingEntryIndex],
          progress: overallProgress,
          label: `${completedMissions}개 완료`
        };
      } else {
        updatedHistory.push({
          name: todayStr,
          date: todayStr,
          progress: overallProgress,
          label: `${completedMissions}개 완료`
        });
      }

      // Check achievements
      const hasFinalCheck = prev.project?.id ? (getUserData(currentUser?.id || '')?.finalChecksByProject?.[prev.project.id] != null) : false;
      const validatedAchievements = checkAchievementsAwarded(prev.achievements, {
        streak: newStreak,
        sourcesCount: prev.sources.length,
        peerReviewsCount: prev.peerReviews.length,
        hasFinalCheck
      });

      return {
        ...prev,
        missions: updatedMissions,
        points: prev.points + 100,
        streak: newStreak,
        longestStreak: newLongestStreak,
        completedMissionCount: newCompletedCount,
        progressHistoryByProject: {
          ...prev.progressHistoryByProject,
          [pId]: updatedHistory
        },
        achievements: validatedAchievements
      };
    });
  };

  const delayMission = (id: string) => {
    setState(prev => {
      const targetMission = prev.missions.find(m => m.id === id);
      let penalty = 500;
      if (targetMission) {
        const progress = targetMission.progress || 0;
        if (progress >= 71) {
          penalty = 0;
        } else if (progress >= 21) {
          penalty = 250;
        }
      }
      
      const newDeposit = Math.max(0, prev.deposit - penalty);
      const updatedMissions = prev.missions.map(m => 
        m.id === id ? { ...m, status: 'delayed' as const } : m
      );
      return {
        ...prev,
        missions: updatedMissions,
        deposit: newDeposit,
        streak: 0,
      };
    });
  };

  const updateMissionWorkspace = (id: string, workspaceData: any) => {
    setState(prev => {
      const updatedMissions = prev.missions.map(m => {
        if (m.id === id) {
          const { progress } = calculateMissionProgress(m.type, workspaceData);
          let newStatus = m.status;
          
          if (m.status !== 'completed' && m.status !== 'delayed') {
            if (progress === 100) {
              newStatus = 'readyToComplete';
            } else if (progress > 0) {
              newStatus = 'inProgress';
            } else {
              newStatus = 'pending';
            }
          } else if (m.status === 'delayed') {
            if (progress === 100) {
              newStatus = 'readyToComplete';
            } else if (progress > 0) {
              newStatus = 'inProgress';
            }
          }

          return {
            ...m,
            workspaceData,
            progress,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return m;
      });
      return {
        ...prev,
        missions: updatedMissions
      };
    });
  };

  const replanMissions = (updatedMissions: Mission[]) => {
    setState(prev => ({
      ...prev,
      missions: updatedMissions
    }));
  };

  const addSource = (source: Omit<Source, 'id' | 'completeness'>) => {
    let completeness = 0;
    if (source.title) completeness += 25;
    if (source.author) completeness += 25;
    if (source.year) completeness += 25;
    if (source.doiOrUrl) completeness += 25;

    const newSource: Source = {
      ...source,
      id: `s-${Date.now()}`,
      completeness,
    };

    setState(prev => {
      const newSources = [...prev.sources, newSource];
      const hasFinalCheck = prev.project?.id ? (getUserData(currentUser?.id || '')?.finalChecksByProject?.[prev.project.id] != null) : false;
      const validatedAchievements = checkAchievementsAwarded(prev.achievements, {
        streak: prev.streak,
        sourcesCount: newSources.length,
        peerReviewsCount: prev.peerReviews.length,
        hasFinalCheck
      });

      return {
        ...prev,
        sources: newSources,
        points: prev.points + 50,
        achievements: validatedAchievements
      };
    });
  };

  const deleteSource = (id: string) => {
    setState(prev => ({
      ...prev,
      sources: prev.sources.filter(s => s.id !== id)
    }));
  };

  const addClaim = (claim: Omit<ClaimNode, 'id'>) => {
    const newClaim: ClaimNode = {
      ...claim,
      id: `c-${Date.now()}`,
    };
    setState(prev => ({
      ...prev,
      claims: [...prev.claims, newClaim]
    }));
  };

  const deleteClaim = (id: string) => {
    setState(prev => ({
      ...prev,
      claims: prev.claims.filter(c => c.id !== id)
    }));
  };

  const updateDraft = (draftUpdate: Partial<Draft>) => {
    setState(prev => ({
      ...prev,
      draft: {
        ...prev.draft,
        ...draftUpdate
      }
    }));
  };

  const addPost = (post: { category: string; projectType: string; title: string; content: string; rewardPoints: number }) => {
    const newPost: CommunityPost = {
      id: `p-${Date.now()}`,
      category: post.category,
      projectType: post.projectType,
      title: post.title,
      content: post.content,
      rewardPoints: post.rewardPoints,
      createdAt: new Date().toISOString(),
      repliesCount: 0,
      resolved: false,
      trustTag: 'needs-verification',
      replies: [],
    };

    setState(prev => {
      const newPoints = Math.max(0, prev.points - post.rewardPoints);
      return {
        ...prev,
        communityPosts: [newPost, ...prev.communityPosts],
        points: newPoints
      };
    });
  };

  const addReply = (postId: string, content: string) => {
    const replyAuthor = state.user ? state.user.name : '홍길동';
    const replyAuthorLevel = state.user 
      ? (state.user.level === 'undergrad' ? '학부생' : state.user.level === 'undergrad_researcher' ? '학부 연구생' : '대학원생') 
      : '대학원생 (석사과정)';

    const newReply: CommunityReply = {
      id: `r-${Date.now()}`,
      author: replyAuthor,
      authorLevel: replyAuthorLevel,
      content,
      createdAt: new Date().toISOString(),
      votes: 0,
      pointsAwarded: 0,
      accepted: false,
    };

    setState(prev => {
      const posts = prev.communityPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            repliesCount: post.repliesCount + 1,
            replies: [...post.replies, newReply]
          };
        }
        return post;
      });
      return { ...prev, communityPosts: posts };
    });
  };

  const acceptReply = (postId: string, replyId: string) => {
    setState(prev => {
      let reward = 0;
      const posts = prev.communityPosts.map(post => {
        if (post.id === postId) {
          reward = post.rewardPoints;
          const replies = post.replies.map(reply => {
            if (reply.id === replyId) {
              return {
                ...reply,
                accepted: true,
                pointsAwarded: post.rewardPoints
              };
            }
            return reply;
          });
          return {
            ...post,
            resolved: true,
            trustTag: 'evidence-backed' as const,
            replies
          };
        }
        return post;
      });
      return {
        ...prev,
        communityPosts: posts
      };
    });
  };

  const addPeerReview = (review: Omit<PeerReview, 'id' | 'createdAt'>) => {
    const newReview: PeerReview = {
      ...review,
      id: `pr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setState(prev => {
      const newPeerReviews = [newReview, ...prev.peerReviews];
      const hasFinalCheck = prev.project?.id ? (getUserData(currentUser?.id || '')?.finalChecksByProject?.[prev.project.id] != null) : false;
      const validatedAchievements = checkAchievementsAwarded(prev.achievements, {
        streak: prev.streak,
        sourcesCount: prev.sources.length,
        peerReviewsCount: newPeerReviews.length,
        hasFinalCheck
      });

      return {
        ...prev,
        peerReviews: newPeerReviews,
        points: prev.points + 150,
        achievements: validatedAchievements
      };
    });
  };

  const purchaseItem = (cost: number, itemName: string): boolean => {
    let success = false;
    setState(prev => {
      if (prev.points >= cost) {
        success = true;
        return {
          ...prev,
          points: prev.points - cost
        };
      }
      return prev;
    });
    return success;
  };

  const buyItem = (itemId: string, pointsCost: number) => {
    setState(prev => {
      if (prev.points >= pointsCost) {
        return {
          ...prev,
          points: prev.points - pointsCost,
          inventory: [...(prev.inventory || []), itemId]
        };
      }
      return prev;
    });
  };

  const refundDeposit = () => {
    setState(prev => ({
      ...prev,
      deposit: 0
    }));
  };

  const saveFinalCheck = (result: FinalCheckResult) => {
    if (!currentUser || !state.project?.id) return;
    const userData = getUserData(currentUser.id);
    if (!userData) return;
    const pId = state.project.id;
    if (!userData.finalChecksByProject) userData.finalChecksByProject = {};
    userData.finalChecksByProject[pId] = { ...result, isStale: false };
    
    const validatedAchievements = checkAchievementsAwarded(userData.achievements || [], {
      streak: userData.streak ?? 0,
      sourcesCount: (userData.sourcesByProject[pId] || []).length,
      peerReviewsCount: (userData.peerReviewsByProject[pId] || []).length,
      hasFinalCheck: true
    });
    userData.achievements = validatedAchievements;
    saveUserData(currentUser.id, userData);

    setState(prev => ({
      ...prev,
      achievements: validatedAchievements
    }));
  };

  const clearFinalCheck = () => {
    if (!currentUser || !state.project?.id) return;
    const userData = getUserData(currentUser.id);
    if (!userData) return;
    const pId = state.project.id;
    if (!userData.finalChecksByProject) userData.finalChecksByProject = {};
    userData.finalChecksByProject[pId] = null;
    
    const validatedAchievements = checkAchievementsAwarded(userData.achievements || [], {
      streak: userData.streak ?? 0,
      sourcesCount: (userData.sourcesByProject[pId] || []).length,
      peerReviewsCount: (userData.peerReviewsByProject[pId] || []).length,
      hasFinalCheck: false
    });
    userData.achievements = validatedAchievements;
    saveUserData(currentUser.id, userData);

    setState(prev => ({
      ...prev,
      achievements: validatedAchievements
    }));
  };

  return (
    <AppContext.Provider value={{
      state,
      projects,
      onboardUser,
      setupProject,
      resetApp,
      completeMission,
      delayMission,
      replanMissions,
      updateMissionWorkspace,
      addSource,
      deleteSource,
      addClaim,
      deleteClaim,
      updateDraft,
      addPost,
      addReply,
      acceptReply,
      addPeerReview,
      purchaseItem,
      changeProject,
      buyItem,
      refundDeposit,
      saveFinalCheck,
      clearFinalCheck,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
