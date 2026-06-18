import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, getCurrentUser, login as authLogin, signup as authSignup, logout as authLogout, createDemoUsersIfNeeded } from '../lib/auth';
import { checkAndMigrateSchema } from '../lib/userData';

interface AuthContextType {
  currentUser: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (userInfo: Omit<AuthUser, 'id'>) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check and migrate schema if needed
    checkAndMigrateSchema();

    // Ensure demo accounts are ready
    createDemoUsersIfNeeded();
    
    // Check for logged-in user
    const user = getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const res = authLogin(email, password);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const signup = (userInfo: Omit<AuthUser, 'id'>) => {
    const res = authSignup(userInfo);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const logout = () => {
    authLogout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
