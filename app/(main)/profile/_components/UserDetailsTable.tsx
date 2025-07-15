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
import React, { useState } from 'react';
import UserDetailsSkeleton from './UserDetailsSkeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { UserDetailsRes } from '@/lib/services/user-contact-service';
import AddressForm from '../../payment/_forms/AddressForm';

const UserDetailTable = () => {
  const { data: userDetails, isLoading, isFetched } = useUserDetails();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState<UserDetailsRes | null>(null);

  const headers = ['Full Name', 'Address', 'Zip Code', 'Phone', 'Action'];

  const handleSelectAddress = (data: UserDetailsRes) => {
    setAddress(data);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <h2 className='font-bold text-3xl mb-4'>Address Book</h2>
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
          <TableBody>
            {isLoading && <UserDetailsSkeleton />}

            {userDetails &&
              userDetails.length &&
              userDetails.map(details => (
                <TableRow className='even:bg-gray-100' key={details.id}>
                  <TableCell className='p-5'>{details.name}</TableCell>
                  <TableCell className='p-5'>{details.address}</TableCell>
                  <TableCell className='p-5'>{details.postalCode}</TableCell>
                  <TableCell className='p-5'>{details.phone}</TableCell>
                  <TableCell className='underline cursor-pointer'>
                    <DialogTrigger
                      className='cursor-pointer underline'
                      onClick={() => handleSelectAddress(details)}
                    >
                      Edit
                    </DialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {isFetched && !userDetails.length && (
            <TableCaption>No Address found.</TableCaption>
          )}
        </Table>
        <DialogContent className='sm:max-w-[425px] max-h-[85vh] overflow-hidden flex flex-col'>
          <DialogHeader className='flex-shrink-0'>
            <DialogTitle>
              <h2>Edit Shipping Details</h2>
            </DialogTitle>
            <DialogDescription>
              Make sure to provide the correct details for shipping.
            </DialogDescription>
          </DialogHeader>
          <div className='flex-1 overflow-y-auto pr-1'>
            <div className='grid gap-4 py-4'>
              <AddressForm
                addressData={address}
                onComplete={() => setDialogOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDetailTable;
