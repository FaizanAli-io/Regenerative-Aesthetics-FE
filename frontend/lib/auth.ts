const TOKEN_KEY = 'access_token';

const getToken = () => localStorage.getItem(TOKEN_KEY);

const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export { getToken, setToken, removeToken };
