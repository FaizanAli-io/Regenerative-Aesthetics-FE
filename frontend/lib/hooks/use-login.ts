import { useMutation } from '@tanstack/react-query';
import api from '../services/api-client';
// import { setToken } from '../auth';
import { Login } from '../services/auth-service';
import { AxiosError } from 'axios';
import { setToken, setUser } from '../auth';

interface LoginInput {
  email: string;
  password: string;
}

const login = async (data: LoginInput): Promise<Login> => {
  const res = await api.post<Login>('/users/signin', data);
  return res.data;
};

export const useLogin = () => {
  return useMutation<Login, AxiosError, LoginInput>({
    mutationFn: login,

    onMutate: () => {
      console.log('Login mutation started');
      // Optionally, you can show a loading spinner or disable the login button here
    },

    onSuccess: data => {
      console.log('Login successful:', data);
      setToken(data.accessToken);
      setUser(data.user);
    },

    onError: error => {
      if (error.status === 400) {
        console.error('Invalid Credentials');
      } else {
        console.error('Login failed:', error.message);
      }
      // Handle login error, e.g., show an error message
    },
  });
};
