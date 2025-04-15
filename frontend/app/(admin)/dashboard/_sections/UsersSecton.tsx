'use client';
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useUsers } from '@/lib/hooks/use-all-users';
import UserRow from '../_components/UserRow';

const UsersSection: React.FC = () => {
  const { data: users, isFetched, isLoading } = useUsers();

  useEffect(() => {
    console.log(users);
  }, [users]);

  const renderOrders = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={6} className='text-center py-2'>
            Loading...
          </td>
        </tr>
      );
    }

    if (!isFetched || !users || !users.length) {
      return (
        <tr>
          <td colSpan={6}>No orders found</td>
        </tr>
      );
    }

    return users.map(user => (
      <UserRow
        id={user.id}
        name={user.name}
        email={user.email}
        createdAt={user.createdAt}
      />
    ));
  };

  return (
    <Card>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='p-3 text-left'>ID</th>
                <th className='p-3 text-left'>Full Name</th>
                <th className='p-3 text-left'>Email</th>
                <th className='p-3 text-left'>Join Date</th>
              </tr>
            </thead>
            <tbody>{renderOrders()}</tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersSection;
