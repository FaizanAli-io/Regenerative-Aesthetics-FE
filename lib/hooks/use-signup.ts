import { useMutation } from '@tanstack/react-query';
import api from '../services/api-client';
import { AxiosError } from 'axios';
import { setUser } from '../auth';
import { Signup } from '../services/auth-service';
import { toast } from 'sonner';

interface Input {
  email: string;
  password: string;
  name: string;
}

const signup = async (data: Input): Promise<Signup> => {
  const res = await api.post<Signup>('/users/signup', data);
  return res.data;
};

export const useSignup = () => {
  return useMutation<Signup, AxiosError, Input>({
    mutationFn: signup,

    onMutate: () => {
      console.log('Signup mutation started');
    },

    onSuccess: data => {
      setUser(data.user);
    },    onError: error => {
      if (error.status === 400) {
        toast.error('Email already exists. Please use a different email.');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    },
  });
};
