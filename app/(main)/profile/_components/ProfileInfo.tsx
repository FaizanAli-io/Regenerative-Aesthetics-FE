import React from 'react';
import { getUser } from '@/lib/auth';

const ProfileInfo = () => {
  const user = getUser();

  const Item = ({ label, value }: { label: string; value: string }) => (
    <div>
      <label className='font-bold text-lg'>{label}</label>
      <p className='border-y-2 p-2 max-w-1/2 border-primary text-lg'>{value}</p>
    </div>
  );

  return (
    <div className='space-y-5 mb-15'>
      <Item label='Full Name' value={user!.name} />
      <Item label='Email' value={user!.email} />
    </div>
  );
};

export default ProfileInfo;
