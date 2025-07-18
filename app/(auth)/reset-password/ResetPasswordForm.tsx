'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useActionState, useEffect } from 'react';
import { resetPassword } from './[token]/page';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const initialState = {
  errors: {},
  success: undefined,
};

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    resetPassword as (
      state: { errors: { newPassword?: string[] }; success?: boolean },
      formData: FormData
    ) => Promise<{ errors: { newPassword?: string[] }; success?: boolean }>,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success('Password has been changed!');
      router.replace('/auth');
    }
  }, [state.success]);

  return (
    <Card className='w-full max-w-sm py-5'>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Enter new password below and submit.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <input type='hidden' name='token' value={token} />

          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>New Password</Label>
              </div>
              <Input
                id='password'
                type='password'
                required
                name='newPassword'
                className={cn({
                  'border-red-500': state?.errors?.newPassword,
                })}
              />
              {state?.errors?.newPassword && (
                <p className='text-sm text-red-600'>
                  {state.errors?.newPassword[0]}
                </p>
              )}
            </div>
          </div>
          <Button
            type='submit'
            className='w-full cursor-pointer mt-4'
            disabled={pending}
          >
            {pending ? 'Submitting...' : 'Change Password'}
          </Button>
        </form>
      </CardContent>
      {/* <CardFooter className='flex-col gap-2'>
      </CardFooter> */}
    </Card>
  );
};

export default ResetPasswordForm;
