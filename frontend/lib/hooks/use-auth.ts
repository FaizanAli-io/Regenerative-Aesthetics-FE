'use client';
import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      console.log('token found', token);
      setIsAuthenticated(true);
    } else {
      console.log('token not found', token);
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};
