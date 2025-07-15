import React from 'react';

interface Props {
  product: string;
  username: string;
  email: string;
  added: Date;
}

const WishlistRow: React.FC<Props> = ({
  product,
  username,
  email,
  added,
}: Props) => {
  return (
    <tr className='border-b hover:bg-gray-50'>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{product}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{username}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{email}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>
          {new Date(added).toLocaleDateString()}
        </span>
      </td>
    </tr>
  );
};

export default WishlistRow;
