import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/lib/services/auth-service';

interface Props extends User {
  createdAt: string;
}

const UserRow: React.FC<Props> = ({ id, name, email, createdAt }) => {
  return (
    <tr className='border-b hover:bg-gray-50'>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{id}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{name}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{email}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </td>
    </tr>
  );
};

export default UserRow;
