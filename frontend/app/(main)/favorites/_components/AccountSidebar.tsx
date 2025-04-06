import React from 'react';

const data = ['Personal Information', 'Orders', 'Favorites', 'Reviews'];

const AccountSidebar = () => {
  return (
    <ul className='divide-y divide-gray-500'>
      {data.map((item, index) => (
        <li key={index} className='text-xl py-4'>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default AccountSidebar;
