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
import { toast } from 'sonner';
import Image from 'next/image';
import { useSignup } from '@/lib/hooks/use-signup';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  navigateToLogin?: () => void;
}

const FormSchema = z
  .object({
    fullName: z.string().min(1, { message: 'Full name is required' }),

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

    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

function SignupForm({ className, navigateToLogin, ...props }: Props) {
  const { isAuthenticated } = useAuth();
  const { mutate: signup, isPending, isSuccess } = useSignup();
  const router = useRouter(); // Use useRouter for navigation

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    signup(
      { name: data.fullName, email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.success('Verification mail sent!');
        },
        onError: (error: any) => {
          // The error toast is already handled in the signup hook
          // but we can add form-specific error handling here if needed
          console.error('Signup error:', error);
        },
      }
    );
  }

  if (isAuthenticated) return null;

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

            <CardTitle className='text-2xl'>Sign Up</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className='flex flex-col gap-6'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name='fullName'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Full Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Confirm Password'
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
                  {isPending ? 'Signing up...' : 'Sign up'}
                </Button>
                <Button variant='outline' className='w-full'>
                  Sign Up with Google
                </Button>
              </form>
              <div className='mt-4 text-center text-sm'>
                Already have an account?
                <span
                  onClick={navigateToLogin}
                  className='underline underline-offset-4 cursor-pointer'
                >
                  Login
                </span>
              </div>
            </Form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default SignupForm;
