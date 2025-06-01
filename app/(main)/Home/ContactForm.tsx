import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';

const ContactForm = () => {
  const inputClass = 'py-8 placeholder:text-2xl w-full border-primary-dark';
  return (
    <form className='w-full'>
      <div className='flex  w-full'>
        <Input placeholder='First Name' className={cn(inputClass, 'mr-5')} />
        <Input placeholder='Last Name' className={inputClass} />
      </div>
      <Input
        type='email'
        placeholder='Email For Example: abc@xyz.com'
        className={cn(inputClass, 'my-8')}
      />
      <Button className='bg-primary-darker text-white border-2 border-white text-2xl py-8 font-normal rounded-2xl'>
        Get in Touch
      </Button>
    </form>
  );
};

export default ContactForm;
