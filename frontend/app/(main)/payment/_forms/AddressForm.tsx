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
import { HTMLAttributes, useEffect } from 'react';
import { useAddUserDetails } from '@/lib/hooks/user-details/use-add-user-details';
// import { useUpdateUserDetails } from '@/lib/hooks/user-details/use-update-user-details';
import { UserDetailsRes } from '@/lib/services/user-contact-service';
import { useUpdateUserDetails } from '@/lib/hooks/user-details/use-edit-user-details';

const FormSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  phone: z.string().min(1, 'Phone number is required'),
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
});

interface AddressFormProps extends HTMLAttributes<HTMLFormElement> {
  addressData?: UserDetailsRes | null;
  onComplete?: () => void;
}

function AddressForm({
  addressData,
  onComplete,
  className,
  ...props
}: AddressFormProps) {
  const { mutate: addUserDetails } = useAddUserDetails();
  const { mutate: updateUserDetails } = useUpdateUserDetails();

  // const { mutate: updateUserDetails } = useUpdateUserDetails();
  const isEditMode = !!addressData;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: '',
      phone: '',
      name: '',
      address: '',
      city: '',
      postalCode: '',
      state: '',
      country: '',
    },
  });

  // Set form values when editing an existing address
  useEffect(() => {
    if (addressData) {
      console.log('Populating form with address data:', addressData);
      // Get all fields that are available in the data and set defaults for missing ones
      form.reset({
        label: addressData.label || '',
        phone: addressData.phone || '',
        // The user field might be missing in the API response
        name: addressData.user?.name || '',
        address: addressData.address || '',
        city: addressData.city || '',
        postalCode: addressData.postalCode || '',
        state: addressData.state || '',
        country: addressData.country || '',
      });
    } else {
      form.reset({
        label: '',
        phone: '',
        name: '',
        address: '',
        city: '',
        postalCode: '',
        state: '',
        country: '',
      });
    }
  }, [addressData, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isEditMode && addressData) {
      console.log('editing address');
      updateUserDetails(
        {
          label: data.label,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          state: data.state,
          country: data.country,
          id: addressData.id,
        },
        {
          onSuccess: () => {
            toast.success('Address updated successfully!');
            form.reset();
            if (onComplete) onComplete();
          },
          onError: () => {
            toast.error('Failed to update address!');
          },
        }
      );
    } else {
      // Add new address
      addUserDetails(
        {
          label: data.label,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          state: data.state,
          country: data.country,
        },
        {
          onSuccess: () => {
            toast.success('Address added successfully!');
            form.reset();
            if (onComplete) onComplete();
          },
          onError: () => {
            toast.error('Failed to add address!');
          },
        }
      );
    }
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
          name='label'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  placeholder='Label eg. Home / Office'
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
          {isEditMode ? 'Update Address' : 'Add New Address'}
        </Button>
      </form>
    </Form>
  );
}

export default AddressForm;
