import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';

const ReviewCard = () => {
  return (
    <Card>
      <CardHeader className='flex justify-between '>
        <div className='flex w-full space-x-2 items-center'>
          <Image
            className='rounded-full'
            src='/images/home/client.png'
            alt='avatar'
            width='70'
            height='70'
          />
          <div className='flex w-full justify-between items-end space-x-4'>
            <div>
              <h4 className='font-semibold text-xl'>John Doe</h4>
              <p className='text-sm'>Lead Designer</p>
            </div>
            <div className='flex space-x-1'>
              <Star color='#ffa033' fill='#ffa033' size={20} />
              <Star color='#ffa033' fill='#ffa033' size={20} />
              <Star color='#ffa033' fill='#ffa033' size={20} />
              <Star color='#ffa033' fill='#ffa033' size={20} />
              <Star color='#ffa033' size={20} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className='font-semibold text-center text-2xl'>
          It was a good experience
        </h3>
        <p className='text-center text-lg'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh
          mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget
          nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis
          felis id augue sit cursus pellentesque enim arcu. Elementum felis
          magna{' '}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
