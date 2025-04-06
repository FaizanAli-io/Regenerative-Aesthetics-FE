'use client';
import { useEffect, useState } from 'react';
import { getToken, getUser, removeToken, removeUser } from '../auth';
import { User } from '../services/auth-service';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsAuthenticated(!!getToken());
    const user = getUser();
    setUser(user);
  }, []);

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    removeUser();
  };

  return { isAuthenticated, logout, user };
};
