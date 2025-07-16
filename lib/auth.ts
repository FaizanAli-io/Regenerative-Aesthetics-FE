import { User } from './services/auth-service';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'access_token';

const getToken = () => localStorage && localStorage.getItem(TOKEN_KEY);

const isValidToken = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    if (decoded.exp * 1000 > Date.now()) return true;

    localStorage.removeItem(TOKEN_KEY);

    return false;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

const setToken = (token: string) =>
  localStorage && localStorage.setItem(TOKEN_KEY, token);

const removeToken = () => localStorage && localStorage.removeItem(TOKEN_KEY);

const USER_KEY = 'user';

const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  if (!isValidToken()) {
    localStorage.removeItem(USER_KEY);
    return null;
  }

  const user = localStorage && localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

const setUser = (user: User) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

const removeUser = () => localStorage && localStorage.removeItem(USER_KEY);

export { getToken, setToken, removeToken, getUser, setUser, removeUser };
