'use client';
import React, { useEffect } from 'react';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import AddressItem from '../_components/AddressItem';
import AddressForm from '../_forms/AddressForm';
import { useUserDetails } from '@/lib/hooks/user-details/use-user-details';

const SectionAddress = () => {
  const { data: userDetails, isLoading } = useUserDetails();

  const renderAddresses = () => {
    if (isLoading) return <p>Loading...</p>;
    if (!userDetails || userDetails.length === 0) {
      return <p>No addresses found.</p>;
    }
    return userDetails.map((item, index) => (
      <AddressItem
        title={item.label}
        label={item.label}
        address={item.address}
        phone={item.phone}
        id={String(item.id)}
        key={index}
      />
    ));
  };

  return (
    <section className='px-20 py-28'>
      <Dialog>
        <h2 className='text-2xl font-semibold mb-8'>Select Address</h2>
        <div className='space-y-5'>
          {renderAddresses()}
          <DialogTrigger asChild>
            <img
              src='/icons/add-new-address.svg'
              alt='Add address button'
              className='w-full cursor-pointer'
            />
          </DialogTrigger>
        </div>
        {/* <Button variant='outline'>Edit Profile</Button> */}
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add the shipping details.</DialogTitle>
            <DialogDescription>
              Make sure to provide the correct details for shipping.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <AddressForm />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SectionAddress;
