'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/lib/hooks/use-auth'; // Assuming a hook to check authentication
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import { useLogin } from '@/lib/hooks/use-login';
import { toast } from 'sonner';
import { useEffect } from 'react';

const FormSchema = z.object({
  email: z.string().email().min(1, {
    message: 'Email is required',
  }),

  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    }),
});

function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { isAuthenticated } = useAuth();
  const { mutate: login, isPending, isSuccess } = useLogin();
  const router = useRouter(); // Use useRouter for navigation

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    login(data, {
      onSuccess: () => {
        toast.success('Login successful!');
        router.push('/products'); // Replace redirect with router.push
      },
    });
  }

  if (isAuthenticated) return null;

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className='flex flex-col gap-6'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Email eg. user@example.com'
                        {...field}
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Password'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full bg-primary-variant2 cursor-pointer'
                disabled={isPending || isSuccess}
              >
                Login
              </Button>
              <Button variant='outline' className='w-full'>
                Login with Google
              </Button>
            </form>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='/sign-up' className='underline underline-offset-4'>
                Sign up
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
