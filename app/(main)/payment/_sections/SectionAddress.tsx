'use client';
import React, { useState, useEffect } from 'react';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RadioGroup } from '@/components/ui/radio-group';
import AddressItem from '../_components/AddressItem';
import AddressForm from '../_forms/AddressForm';
import { useUserDetails } from '@/lib/hooks/user-details/use-user-details';
import { useCart } from '@/lib/stores/cart';
import { getUser } from '@/lib/auth';

const SectionAddress = () => {
  const { data: userDetails, isLoading, isError } = useUserDetails();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const address = useCart(state => state.address);
  const selectedAddress = useCart(state => state.selectedAddress);
  const setSelectedAddress = useCart(state => state.setSelectedAddress);

  const handleEditAddress = (address: any) => {
    if (getUser()) setEditingAddress(address);
    else {
      setEditingAddress({
        ...address,
        label: address.email,
        name: address.name,
      });
    }
    setDialogOpen(true);
  };

  const handleAddressFormComplete = () => {
    setDialogOpen(false);
    setEditingAddress(null);
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    if (userDetails && Array.isArray(userDetails)) {
      const selectedAddressData = userDetails.find(
        item => String(item.id) === id
      );
      setSelectedAddress(selectedAddressData);
    }
  };
  // Set default selected address if available
  useEffect(() => {
    if (
      userDetails &&
      Array.isArray(userDetails) &&
      userDetails.length > 0 &&
      !selectedAddressId &&
      !selectedAddress
    ) {
      setSelectedAddressId(String(userDetails[0].id));
      setSelectedAddress(userDetails[0]);
    }
  }, [userDetails, selectedAddressId, selectedAddress, setSelectedAddress]);

  const renderGuestAddress = () => {
    if (!address) return <p>No guest address available.</p>;

    const { address: addr, phone } = address;

    return (
      <AddressItem
        title={'Guest Address'}
        label={'Default'}
        address={addr}
        phone={phone}
        id={'1'}
        isSelected
        onEdit={() => handleEditAddress(address)}
      />
    );
  };

  const renderAddresses = () => {
    if (typeof window === 'undefined') return null;

    const user = getUser();

    if (!user) return renderGuestAddress();

    if (isLoading) return <p>Loading addresses...</p>;

    if (isError) return <p>Failed to load addresses. Please try again.</p>;

    if (
      !userDetails ||
      !Array.isArray(userDetails) ||
      userDetails.length === 0
    ) {
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
        onEdit={() => handleEditAddress(item)}
        isSelected={selectedAddressId === String(item.id)}
        onSelect={() => handleSelectAddress(String(item.id))}
      />
    ));
  };

  const getAddressButton = () => !getUser() && !!address;

  return (
    <section className='px-20 py-28'>
      <Dialog
        open={dialogOpen}
        onOpenChange={open => {
          setDialogOpen(open);
          if (!open) setEditingAddress(null);
        }}
      >
        <h2 className='text-2xl font-semibold mb-8'>Select Address</h2>
        <div className='space-y-5'>
          <RadioGroup
            value={selectedAddressId || ''}
            onValueChange={setSelectedAddressId}
            className='space-y-5'
          >
            {renderAddresses()}
          </RadioGroup>
          <DialogTrigger asChild hidden={getAddressButton()}>
            <img
              src='/icons/add-new-address.svg'
              alt='Add address button'
              className='w-full cursor-pointer'
              onClick={() => setEditingAddress(null)}
            />
          </DialogTrigger>
        </div>
        <DialogContent className='sm:max-w-[425px] max-h-[85vh] overflow-hidden flex flex-col'>
          <DialogHeader className='flex-shrink-0'>
            <DialogTitle>
              {editingAddress
                ? 'Edit shipping details'
                : 'Add the shipping details'}
            </DialogTitle>
            <DialogDescription>
              Make sure to provide the correct details for shipping.
            </DialogDescription>
          </DialogHeader>
          <div className='flex-1 overflow-y-auto pr-1'>
            <div className='grid gap-4 py-4'>
              <AddressForm
                addressData={editingAddress}
                onComplete={handleAddressFormComplete}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SectionAddress;
