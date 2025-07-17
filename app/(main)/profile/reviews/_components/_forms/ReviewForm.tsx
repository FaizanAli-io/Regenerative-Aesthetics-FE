import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useAddReview } from '@/lib/hooks/reviews/use-add-review';
import { useReviewStore } from '../_store/reviewStore';
import Ratings from '@/app/components/Ratings';
import { motion } from 'motion/react';

const MotionButton = motion(Button);

const Schema = z.object({
  ratings: z.number().min(0).max(5),
  comment: z.string().min(3).max(500),
});

type Req = z.infer<typeof Schema>;

const ReviewForm = () => {
  const { mutate: addReview, isPending } = useAddReview();
  const productId = useReviewStore(s => s.productId);
  const setDialogOpen = useReviewStore(s => s.setDialogOpen);

  const form = useForm<Req>({
    resolver: zodResolver(Schema),
    defaultValues: {
      ratings: 0,
      comment: '',
    },
  });

  const onSubmit = (data: Req) => {
    if (!productId) return;

    addReview(
      { ...data, productId },
      {
        onSuccess: () => {
          form.reset();
          setDialogOpen(false);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='ratings'
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Rating</FormLabel>
              <Ratings onChange={field.onChange} value={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='comment'
          control={form.control}
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Write your review here.' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MotionButton
          whileTap={{
            scale: 0.98,
            background: '#36ca7b',
          }}
          type='submit'
          className='w-full bg-primary-variant2 cursor-pointer'
          disabled={isPending}
        >
          Done
        </MotionButton>
      </form>
    </Form>
  );
};

export default ReviewForm;
