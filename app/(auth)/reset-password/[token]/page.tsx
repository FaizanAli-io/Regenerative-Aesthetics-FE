'use server';
import React from 'react';
import axios from 'axios';
import appConfig from '@/app.config';
import ResetPasswordForm from '../ResetPasswordForm';
import { z } from 'zod';

const schema = z.object({
  newPassword: z
    .string()
    .min(5, 'Password must be atleast 5 characters long.')
    .max(50, 'Password cannot exceed 50 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
});

export async function resetPassword(_: any, formData: FormData) {
  const newPassword = formData.get('newPassword');
  const token = formData.get('token');

  const validated = schema.safeParse({ newPassword });
  if (!validated.success) {
    return {
      sucesss: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await axios.post(
      `${appConfig.apiBaseUrl}/users/reset-password`,
      {
        token,
        newPassword,
      }
    );

    console.log(res.data);

    return { success: true, errors: null };
  } catch {
    return { success: false, errors: null };
  }
}

interface Props {
  params: Promise<{ token: string }>;
}

const Page = async ({ params }: Props) => {
  const { token } = await params;

  return (
    <div className='flex justify-center items-center my-44 h-[55vh]'>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default Page;
