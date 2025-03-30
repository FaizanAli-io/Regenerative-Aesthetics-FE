'use client';
import React from 'react';
import TextField from '../components/TextField';
import ButtonOutline from '../components/ButtonOutline';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

const CreditCardForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-12'>
      <Image
        src='/icons/credit-card.svg'
        alt='Credit Card'
        width={400}
        height={500}
        // className='mb-4'
      />

      <div className='space-y-5'>
        <TextField placeholder='Cardholder Name' />
        <TextField placeholder='Card Number' />
        <div className='flex space-x-2'>
          <TextField placeholder='Exp Date' />
          <TextField placeholder='CVV' />
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox
          className=' data-[state=checked]:bg-primary-variant2'
          id='billing-address'
        />
        <label
          htmlFor='billing-address'
          className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Same as billing address
        </label>
      </div>

      <div className='flex space-x-5'>
        <ButtonOutline className='flex-1'>Back</ButtonOutline>
        <ButtonOutline className='flex-1 bg-primary-variant2 text-white'>
          Pay
        </ButtonOutline>
      </div>
    </form>
  );
};

export default CreditCardForm;
