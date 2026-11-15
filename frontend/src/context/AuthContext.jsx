// frontend/src/context/AuthContext.jsx
// ─────────────────────────────────────────────────────────────
// Global authentication state using React Context API.
//
// Provides:
//   • currentUser  – the logged-in user object (or null)
//   • token        – JWT token string (or null)
//   • login(data)  – stores user + token in state & localStorage
//   • logout()     – clears state & localStorage
//   • isAdmin()    – true if role is ADMIN
//   • isHR()       – true if role is ADMIN or HR
// ─────────────────────────────────────────────────────────────
import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

/**
 * Custom hook to consume the AuthContext.
 * Usage:  const { currentUser, login, logout } = useAuth();
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * AuthProvider wraps the entire application.
 * State is initialised from localStorage so the user stays
 * logged in after a page refresh.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  /**
   * login – called after a successful /api/auth/login response.
   * @param {object} responseData – { token, id, username, email, role, … }
   */
  const login = useCallback((responseData) => {
    const { token: jwt, ...userData } = responseData;
    setToken(jwt);
    setCurrentUser(userData);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user',  JSON.stringify(userData));
  }, []);

  /**
   * logout – clears all auth state.
   */
  const logout = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const isAdmin = useCallback(() => currentUser?.role === 'ADMIN', [currentUser]);
  const isHR    = useCallback(() => ['ADMIN', 'HR'].includes(currentUser?.role), [currentUser]);

  const value = {
    currentUser,
    token,
    login,
    logout,
    isAdmin,
    isHR,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

