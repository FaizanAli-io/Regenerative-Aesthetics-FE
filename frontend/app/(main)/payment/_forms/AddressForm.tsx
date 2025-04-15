'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useCheckout } from '@/lib/hooks/cart/use-checkout';
import { HTMLAttributes } from 'react';
import { useCart } from '@/lib/stores/cart';

const FormSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
});

function AddressForm({ className, ...props }: HTMLAttributes<HTMLFormElement>) {
  const setAddress = useCart(state => state.setAddress);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: '',
      name: '',
      address: '',
      city: '',
      postalCode: '',
      state: '',
      country: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setAddress(data);
    toast.success('Address added successfully!');
  }

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6', className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder='phone eg. +92300 1234567'
                  {...field}
                  type='text'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='Address' {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder='City' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder='Postal Code' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder='State' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder='Country' {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          className='w-full bg-primary-variant2 cursor-pointer'
        >
          Add New Address
        </Button>
      </form>
    </Form>
  );
}

export default AddressForm;
