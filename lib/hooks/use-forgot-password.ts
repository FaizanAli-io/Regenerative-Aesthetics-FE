import { useMutation } from '@tanstack/react-query';
import api from '../services/api-client';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface Request {
  email: string;
}

const forgotPass = async (data: Request): Promise<never> => {
  const res = await api.post<never>('/users/forgot-password', data);
  return res.data;
};

export const useForgotPassword = () => {
  return useMutation<never, AxiosError, Request>({
    mutationFn: forgotPass,
    onSuccess: () => toast.success('Reset password link sent!'),
    onError: error => toast.error(error.message),
  });
};
