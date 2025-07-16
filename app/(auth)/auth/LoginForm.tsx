'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useLogin } from '@/lib/hooks/use-login';
import { toast } from 'sonner';
import Image from 'next/image';
import { getUser } from '@/lib/auth';
import { useForgotPassword } from '@/lib/hooks/use-forgot-password';
import { motion } from 'motion/react';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  navigateToSignup?: () => void;
}

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

function LoginForm({ className, navigateToSignup, ...props }: Props) {
  const { mutate: login, isPending, isSuccess } = useLogin();
  const { mutate: forgotPass, isPending: pendingForgotPass } =
    useForgotPassword();

  const router = useRouter();

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
      onError: (error: any) => {
        // The error toast is already handled in the login hook
        // but we can add form-specific error handling here if needed
        console.error('Login error:', error);
      },
    });
  }

  if (getUser()) return null;

  const handleForgotPass = () => {
    if (pendingForgotPass) return;

    const email = form.getValues().email;

    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!email) return toast.error('Enter your email');
    if (!emailRegex.test(email)) return toast.error('Enter a valid email.');

    forgotPass({ email });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='grid grid-cols-2'>
        <Image
          src='/images/form-img.jpg'
          alt='Logo'
          width={1000}
          height={1000}
          className='w-full h-full object-cover'
        />
        <div className='py-6'>
          <CardHeader>
            <div className='w-full flex justify-center'>
              <Image
                src='/images/logo-symbol.jpg'
                alt='Logo'
                width={100}
                height={100}
                className='w-44'
              />
            </div>

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
                      <div className='flex justify-end cursor-pointer'>
                        <motion.p
                          whileTap={{ scale: 0.95 }}
                          className='underline'
                          onClick={handleForgotPass}
                        >
                          Forgot Password?
                        </motion.p>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full bg-primary-variant2 cursor-pointer'
                  disabled={isPending || isSuccess}
                >
                  {isPending ? 'Logging in...' : 'Login'}
                </Button>

                <Button variant='outline' className='w-full'>
                  Login with Google
                </Button>
              </form>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <span
                  onClick={navigateToSignup}
                  className='underline underline-offset-4 cursor-pointer'
                >
                  Sign up
                </span>
              </div>
            </Form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default LoginForm;
