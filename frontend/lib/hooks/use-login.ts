import { useMutation } from '@tanstack/react-query';
import api from '../services/api-client';
// import { setToken } from '../auth';
import { User } from '../services/auth-service';
import { AxiosError } from 'axios';
import { setToken } from '../auth';

interface LoginInput {
  email: string;
  password: string;
}

const login = async (data: LoginInput): Promise<User> => {
  const res = await api.post<User>('/users/signin', data);
  return res.data;
};

export const useLogin = () => {
  return useMutation<User, AxiosError, LoginInput>({
    mutationFn: login,

    onMutate: () => {
      console.log('Login mutation started');
      // Optionally, you can show a loading spinner or disable the login button here
    },

    onSuccess: data => {
      console.log('Login successful:', data);
      setToken(data.accessToken);
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
