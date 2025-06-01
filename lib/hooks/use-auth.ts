'use client';
import { useEffect, useState } from 'react';
import { getToken, getUser, removeToken, removeUser } from '../auth';
import { User } from '../services/auth-service';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This effect will run on component mount and when the browser window gains focus
  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      setIsAuthenticated(!!token);

      if (token) {
        const userData = getUser();
        setUser(userData);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    // Check auth on initial load
    checkAuth();

    // Also check when window regains focus (in case token was removed in another tab)
    window.addEventListener('focus', checkAuth);

    return () => {
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  const logout = () => {
    removeToken();
    removeUser();
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, logout, user, isLoading };
};
