import React from 'react';
import { cn } from '@/lib/utils';
import { Edit3, X } from 'lucide-react';
import { useDeleteUserDetails } from '@/lib/hooks/user-details/use-delete-user-details';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  label: string;
  address: string;
  phone: string;
  onEdit?: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

const AddressItem = ({
  id,
  title,
  label,
  address,
  phone,
  onEdit,
  isSelected = false,
  onSelect,
  className,
  ...props
}: Props) => {
  const { mutate: deleteUserDetails } = useDeleteUserDetails();

  const handleDeleteAddress = () => {
    deleteUserDetails(+id, {
      onSuccess: () => {
        toast.success('Address deleted successfully!');
      },
      onError: () => {
        toast.error('Failed to delete address!');
      },
    });
  };

  return (
    <div
      className={cn(
        'bg-primary-variant2/5 flex items-center justify-between space-x-5 p-5 text-2xl text-primary-darker rounded-md',
        isSelected ? 'border-2 border-primary-variant2' : '',
        className
      )}
      {...props}
    >
      <div className='text-xl space-y-2 flex-1'>
        <div className='flex items-center space-x-5'>
          <RadioGroupItem
            value={id}
            id={`address-${id}`}
            checked={isSelected}
            onClick={onSelect}
            className='data-[state=checked]:bg-primary-variant2 '
          />
          <label
            htmlFor={`address-${id}`}
            className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            onClick={onSelect}
          >
            {title}
          </label>

          <label
            className='bg-primary-variant2 p-2 uppercase rounded-md text-white text-sm'
            htmlFor={`address-${id}`}
          >
            {label}
          </label>
        </div>

        <p>{address}</p>
        <p>{phone}</p>
      </div>
      <div className='flex space-x-2'>
        <Edit3
          className='cursor-pointer hover:text-primary-variant2'
          onClick={onEdit}
        />
        <X
          className='cursor-pointer hover:text-red-500'
          onClick={handleDeleteAddress}
        />
      </div>
    </div>
  );
};

export default AddressItem;
