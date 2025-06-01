import React from 'react';
import SignupForm from './SignUpForm';

const Page = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-4xl'>
        <SignupForm />
      </div>
    </div>
  );
};

export default Page;
