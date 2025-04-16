import { User } from './services/auth-service';

const TOKEN_KEY = 'access_token';

const getToken = () => localStorage && localStorage.getItem(TOKEN_KEY);

const setToken = (token: string) =>
  localStorage && localStorage.setItem(TOKEN_KEY, token);

const removeToken = () => localStorage && localStorage.removeItem(TOKEN_KEY);

const USER_KEY = 'user';

const getUser = (): User | null => {
  const user = localStorage && localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

const setUser = (user: User) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

const removeUser = () => localStorage && localStorage.removeItem(USER_KEY);

export { getToken, setToken, removeToken, getUser, setUser, removeUser };
