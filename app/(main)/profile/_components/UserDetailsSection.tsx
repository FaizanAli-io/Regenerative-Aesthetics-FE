'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import AddressForm from '../../payment/_forms/AddressForm';
import UserDetailsTable from './UserDetailsTable';
import { useUserDialogStore } from '../_stores/userDetailsStore';
import ProfileInfo from './ProfileInfo';

const UserDetailsSection = () => {
  const dialogOpen = useUserDialogStore(s => s.dialogOpen);
  const setDialogOpen = useUserDialogStore(s => s.setDialogOpen);

  const address = useUserDialogStore(s => s.address);
  const setAddress = useUserDialogStore(s => s.setAddress);

  const handleComplete = () => {
    setAddress(null);
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <h2 className='font-bold text-3xl mb-4'>Profile</h2>
        <ProfileInfo />
        <h2 className='font-bold text-3xl mb-4'>Address Book</h2>
        <UserDetailsTable />
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
              <AddressForm addressData={address} onComplete={handleComplete} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDetailsSection;
