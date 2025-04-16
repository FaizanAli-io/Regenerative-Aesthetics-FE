'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories } from '@/lib/hooks/categories/use-categories';
import { Category } from '@/lib/services/category-services';
import CloudinaryUploader from '@/components/FileUploader';

// Form schema
const productFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' }),
  price: z.coerce
    .number()
    .positive({ message: 'Price must be a positive number' }),
  stock: z.coerce
    .number()
    .int()
    .nonnegative({ message: 'Stock must be a non-negative integer' }),
  images: z
    .string()
    .array()
    .min(1, { message: 'At least one image is required' }),
  categoryId: z.coerce
    .number()
    .positive({ message: 'Please select a category' }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: Partial<ProductFormValues>;
  onSubmit: (data: ProductFormValues) => void;
}

const ProductsForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [openCategoryCombobox, setOpenCategoryCombobox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Default values
  const defaultValues: Partial<ProductFormValues> = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
    images: [''],
    ...initialData,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  // Get all child categories (no parent categories)
  const childCategories =
    categories?.flatMap(category => category.children || []) || [];

  // Filtered categories based on search query
  const filteredCategories = childCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus input when dropdown opens
  useEffect(() => {
    if (openCategoryCombobox && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [openCategoryCombobox]);

  // Handle image inputs
  const handleAddImageField = () => {
    const currentImages = form.getValues().images || [];
    form.setValue('images', [...currentImages, '']);
  };

  const handleRemoveImageField = (index: number) => {
    const currentImages = form.getValues().images || [];
    if (currentImages.length > 1) {
      form.setValue(
        'images',
        currentImages.filter((_, i) => i !== index)
      );
    }
  };

  // Handle image uploads
  const handleImageUploaded = (url: string, index: number) => {
    const currentImages = form.getValues().images || [];
    const updatedImages = [...currentImages];
    updatedImages[index] = url;
    form.setValue('images', updatedImages);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Product title' {...field} />
              </FormControl>
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
                  placeholder='Product description'
                  className='min-h-[100px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    step='0.01'
                    placeholder='0.00'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='0' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                disabled={categoriesLoading}
                onValueChange={value => field.onChange(parseInt(value))}
                value={field.value ? String(field.value) : undefined}
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {childCategories.map(category => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className='flex justify-between items-center mb-2'>
            <FormLabel>Product Images</FormLabel>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleAddImageField}
            >
              Add Image
            </Button>
          </div>

          {form.watch('images')?.map((imageUrl, index) => (
            <div key={index} className='flex mb-4 gap-2'>
              <FormField
                control={form.control}
                name={`images.${index}`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <div className='space-y-3'>
                        <CloudinaryUploader
                          onImageUploaded={url =>
                            handleImageUploaded(url, index)
                          }
                          currentImage={field.value}
                        />
                        <Input
                          placeholder='Image URL'
                          {...field}
                          className='mt-2'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch('images').length > 1 && (
                <Button
                  type='button'
                  variant='destructive'
                  size='icon'
                  onClick={() => handleRemoveImageField(index)}
                  className='self-start mt-8'
                >
                  ×
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className='flex justify-end'>
          <Button type='submit'>
            {initialData ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductsForm;
