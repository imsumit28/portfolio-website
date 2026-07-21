import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Children are gated on `loading`, and the effect that clears it never runs
  // during prerendering — so starting `true` on the server would emit an empty
  // document. There is no session to check without a browser anyway.
  const [loading, setLoading] = useState(typeof window !== 'undefined');

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get('/auth/user');
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data.user);
    return true;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore — cookie may already be invalid
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
