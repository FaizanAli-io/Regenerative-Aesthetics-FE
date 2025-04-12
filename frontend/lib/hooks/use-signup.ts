import { useMutation } from '@tanstack/react-query';
import api from '../services/api-client';
import { AxiosError } from 'axios';
import { setUser } from '../auth';
import { Signup } from '../services/auth-service';

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
    },

    onError: error => {
      //  TODO: implement email not found on signup form.
      console.error('SignUp failed: email not available', error.message);
    },
  });
};
