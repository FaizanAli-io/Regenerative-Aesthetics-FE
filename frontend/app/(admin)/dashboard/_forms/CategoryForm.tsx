'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/lib/hooks/categories/use-categories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Define the form schema with Zod
const categoryFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(50, {
      message: 'Title must not be longer than 50 characters.',
    }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(500, {
      message: 'Description must not be longer than 500 characters.',
    }),
  parentCategoryId: z.number().optional(),
});

// Define form values type
type CategoryFormValues = z.infer<typeof categoryFormSchema>;

// Default values for the form
const defaultValues: CategoryFormValues = {
  title: 'Skin Products',
  description:
    'Includes Cleanser, Sunscreen, Night Cream, Exfoliator, Lip Bam, Acne Treatment etc.',
  parentCategoryId: undefined,
};

interface CategoryFormProps {
  initialData?: CategoryFormValues;
  onSubmit?: (data: CategoryFormValues) => void;
}

export function CategoryForm({
  initialData = defaultValues,
  onSubmit,
}: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [openParentCategory, setOpenParentCategory] = useState(false);
  const { data: categories } = useCategories();

  // Initialize the form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  function handleSubmit(data: CategoryFormValues) {
    setIsLoading(true);
    if (onSubmit) onSubmit(data);
    setIsLoading(false);
  }

  return (
    <Card className='w-full max-w-2xl  py-5'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Category Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter category title'
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed for the category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter category description'
                      className='resize-none min-h-[120px]'
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of what this category
                    includes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='parentCategoryId'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Parent Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={value => {
                        form.setValue(
                          'parentCategoryId',
                          value === 'none' ? undefined : parseInt(value)
                        );
                      }}
                      value={field.value ? String(field.value) : 'none'}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select parent category (optional)' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='none'>
                          None (Top level category)
                        </SelectItem>
                        {categories?.map(category => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a parent category if this is a subcategory. Leave
                    empty for a top-level category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                disabled={isLoading}
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Category'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CategoryForm;
