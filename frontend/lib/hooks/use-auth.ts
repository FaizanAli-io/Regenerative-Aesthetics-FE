'use client';
import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};
