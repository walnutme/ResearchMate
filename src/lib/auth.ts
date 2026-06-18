import { User } from '../types';
import { 
  initializeNewUserData, 
  createDemoUser1Data, 
  createDemoUser2Data,
  saveUserData,
  getUserData
} from './userData';

const USERS_KEY = 'researchMate_users';
const CURRENT_USER_KEY = 'researchMate_currentUser';

export interface AuthUser extends User {
  id: string;
  email: string;
  password?: string;
}

/** 이메일을 trim + toLowerCase로 정규화합니다. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** localStorage에서 전체 사용자 목록을 읽어옵니다. */
export function getUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading users from localStorage:', e);
    return [];
  }
}

/** 전체 사용자 목록을 localStorage에 저장합니다. */
export function saveUsers(users: AuthUser[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users to localStorage:', e);
  }
}

// Backward-compatible aliases
export const getRegisteredUsers = getUsers;
const saveRegisteredUsers = saveUsers;

// Get current logged-in user
export function getCurrentUser(): AuthUser | null {
  try {
    const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUserId) return null;
    
    const users = getRegisteredUsers();
    return users.find(u => u.id === currentUserId) || null;
  } catch (e) {
    console.error('Error getting current user:', e);
    return null;
  }
}

// Seed demo users if they don't exist yet
export function createDemoUsersIfNeeded(): void {
  const users = getRegisteredUsers();
  const hasDemo1 = users.some(u => u.email === 'demo1@researchmate.app');
  const hasDemo2 = users.some(u => u.email === 'demo2@researchmate.app');

  const newUsers = [...users];

  if (!hasDemo1) {
    const demo1Profile: AuthUser = {
      id: 'u-demo1',
      email: 'demo1@researchmate.app',
      password: 'password123',
      name: '김철수',
      level: 'undergrad_researcher',
      major: '인문학',
      language: 'ko'
    };
    newUsers.push(demo1Profile);
    
    // Seed initial app data for Demo 1
    const demo1Data = createDemoUser1Data(demo1Profile);
    saveUserData('u-demo1', demo1Data);
  }

  if (!hasDemo2) {
    const demo2Profile: AuthUser = {
      id: 'u-demo2',
      email: 'demo2@researchmate.app',
      password: 'password123',
      name: '이영희',
      level: 'grad',
      major: '국제학',
      language: 'both'
    };
    newUsers.push(demo2Profile);

    // Seed initial app data for Demo 2
    const demo2Data = createDemoUser2Data(demo2Profile);
    saveUserData('u-demo2', demo2Data);
  }

  if (!hasDemo1 || !hasDemo2) {
    saveRegisteredUsers(newUsers);
  }
}

// Sign up a new user
export function signup(userInfo: Omit<AuthUser, 'id'>): { success: boolean; error?: string; user?: AuthUser } {
  // 이메일 정규화: trim + lowercase
  const normalizedEmail = normalizeEmail(userInfo.email);

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return { success: false, error: '올바른 이메일 형식이 아닙니다.' };
  }

  // Validate password length
  if (!userInfo.password || userInfo.password.length < 4) {
    return { success: false, error: '비밀번호는 최소 4자 이상이어야 합니다.' };
  }

  // 1. localStorage에서 기존 사용자 목록 읽기 (없으면 빈 배열)
  const existingUsers = getUsers();

  // 2. 같은 이메일이 이미 있으면 차단
  const exists = existingUsers.some(u => normalizeEmail(u.email) === normalizedEmail);
  if (exists) {
    return { success: false, error: '이미 가입된 이메일 주소입니다.' };
  }

  // 3. 새 사용자 객체 생성 (이메일은 정규화된 값으로 저장)
  const userId = `u-${Date.now()}`;
  const newUser: AuthUser = {
    ...userInfo,
    email: normalizedEmail,
    id: userId,
  };

  // 4. 기존 목록에 추가 (덮어쓰기 아님)
  existingUsers.push(newUser);
  saveUsers(existingUsers);

  // 5. 신규 사용자의 앱 데이터 파티션 초기화
  const initialData = initializeNewUserData(newUser);
  saveUserData(userId, initialData);

  // 6. 자동 로그인
  localStorage.setItem(CURRENT_USER_KEY, userId);

  return { success: true, user: newUser };
}

// Log in an existing user
export function login(email: string, password: string): { success: boolean; error?: string; user?: AuthUser } {
  // 1. 이메일 정규화: trim + lowercase
  const normalizedEmail = normalizeEmail(email);

  // 2. 데모 사용자 보장 (없을 때만 추가, 기존 사용자 유지)
  createDemoUsersIfNeeded();

  // 3. localStorage에서 전체 사용자 목록 읽기
  const users = getUsers();

  // 4. 이메일(정규화)과 비밀번호 일치하는 사용자 찾기
  const user = users.find(
    u => normalizeEmail(u.email) === normalizedEmail && u.password === password
  );

  if (!user) {
    return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }

  // 5. 사용자 데이터 파티션이 없으면 초기화
  if (!getUserData(user.id)) {
    saveUserData(user.id, initializeNewUserData(user));
  }

  // 6. 현재 사용자 설정
  localStorage.setItem(CURRENT_USER_KEY, user.id);
  return { success: true, user };
}

// Log out current user
export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}
