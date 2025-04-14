import React from 'react';
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

const data = [
  {
    title: '2118 Thornridge',
    label: 'Home',
    address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    phone: '(209) 555-0104',
  },
  {
    title: 'Headoffice',
    label: 'Office',
    address: '2715 Ash Dr. San Jose, South Dakota 83475',
    phone: '(704) 555-0127',
  },
];

const SectionAddress = () => {
  return (
    <section className='px-20 py-28'>
      <Dialog>
        <h2 className='text-2xl font-semibold mb-8'>Select Address</h2>
        <div className='space-y-5'>
          {data.map((item, index) => (
            <AddressItem
              title={item.title}
              label={item.label}
              address={item.address}
              phone={item.phone}
              key={index}
            />
          ))}
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
