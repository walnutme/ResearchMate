import { AppState } from '../types';
import { mockCommunityPosts, mockPeerReviews, mockSources, mockClaims } from './mockData';

const STORAGE_KEY = 'research_mate_state';

const defaultState: AppState = {
  user: null,
  project: null,
  missions: [],
  sources: mockSources,
  claims: mockClaims,
  draft: {
    introText: '',
    bodyText: '',
    conclusionText: '',
    introProgress: 0,
    bodyProgress: 0,
    conclusionProgress: 0,
  },
  communityPosts: mockCommunityPosts,
  peerReviews: mockPeerReviews,
  points: 1200, // Preloaded for testing rewards
  deposit: 10000,
  streak: 3,
};

export function loadState(): AppState {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultState;
    const parsed = JSON.parse(data);
    // Ensure nested objects are fully merged
    return {
      ...defaultState,
      ...parsed,
    };
  } catch (e) {
    console.error('Error loading state from localStorage', e);
    return defaultState;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state to localStorage', e);
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing localStorage', e);
  }
}
