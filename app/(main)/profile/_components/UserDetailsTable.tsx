'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUserDetails } from '@/lib/hooks/user-details/use-user-details';
import React from 'react';
import UserDetailsSkeleton from './UserDetailsSkeleton';
import { UserDetailsRes } from '@/lib/services/user-contact-service';
import { useUserDialogStore } from '../_stores/userDetailsStore';

const UserDetailsTable = () => {
  const { data: userDetails, isLoading } = useUserDetails();
  const setDialogOpen = useUserDialogStore(s => s.setDialogOpen);
  const setAddress = useUserDialogStore(s => s.setAddress);

  const headers = ['Full Name', 'Address', 'Zip Code', 'Phone', 'Action'];
  const handleSelectAddress = (data: UserDetailsRes) => {
    setAddress(data);
    setDialogOpen(true);
  };

  const renderTbody = () => {
    if (isLoading) return <UserDetailsSkeleton />;

    if (userDetails && userDetails.length) {
      return userDetails.map(details => (
        <TableRow className='even:bg-gray-100' key={details.id}>
          <TableCell className='p-5'>{details.name}</TableCell>
          <TableCell className='p-5'>{details.address}</TableCell>
          <TableCell className='p-5'>{details.postalCode}</TableCell>
          <TableCell className='p-5'>{details.phone}</TableCell>
          <TableCell className='underline cursor-pointer'>
            <p
              className='cursor-pointer underline'
              onClick={() => handleSelectAddress(details)}
            >
              Edit
            </p>
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <TableRow>
        <TableCell colSpan={6}>
          <p className='text-center'>No record found.</p>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table className='border-1'>
      <TableHeader className='bg-primary'>
        <TableRow>
          {headers.map((data, i) => (
            <TableHead key={i} className='text-white px-5 last:px-0'>
              {data}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{renderTbody()}</TableBody>
    </Table>
  );
};

export default UserDetailsTable;
