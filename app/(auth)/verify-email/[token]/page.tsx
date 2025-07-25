import appConfig from '@/app.config';
import axios from 'axios';
import React from 'react';
type Props = {
  params: Promise<{
    token: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { token } = await params;

  try {
    const res = await axios.get(
      `${appConfig.apiBaseUrl}/users/verify-email/?token=${token}`
    );
    console.log(res);
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      if (ex.response) {
        console.error('Error response:', ex.response.data);
      }
    }
    console.error('Error verifying email:', ex);
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold'>Verify Email</h1>
      <p className='mt-4 text-lg'>Your email has been verified</p>
      <p className='mt-2 text-lg'>You can now login to your account.</p>
      <a
        href='/auth'
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded text-center'
      >
        Go to login
      </a>
    </div>
  );
};

export default page;
