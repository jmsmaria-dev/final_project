import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
    if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user');
  }, [token, user]);

  const login = (jwt, userInfo) => {
    setToken(jwt);
    setUser(userInfo);
  };
  const logout = () => { setToken(null); setUser(null); };

  const value = useMemo(() => ({ token, user, isAuthenticated: !!token, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
