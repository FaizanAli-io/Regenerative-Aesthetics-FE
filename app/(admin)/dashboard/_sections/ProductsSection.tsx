'use client';

import React, { useState } from 'react';
import { useProducts } from '@/lib/hooks/products/use-products';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ProductsForm from '../_forms/ProductsForm';
import type { Product } from '@/lib/services/products-service';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAddProduct } from '@/lib/hooks/products/use-add-product';
import { useEditCategory } from '@/lib/hooks/categories/use-edit-categories';
import { useEditProduct } from '@/lib/hooks/products/use-edit-product';
import { useDeleteProduct } from '@/lib/hooks/products/use-delete-product';
import { useUsers } from '@/lib/hooks/use-all-users';

interface ProductFormData extends Omit<Product, 'id' | 'category' | 'price'> {
  categoryId: number;
  price: number;
}

const ProductsSection = () => {
  const { data: products, isLoading, isError } = useProducts();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { mutate: addProduct } = useAddProduct();
  const { mutate: updateProduct } = useEditProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleAddProduct = (formData: ProductFormData) => {
    addProduct(formData, {
      onSuccess: () => {
        toast.success('Product added successfully!');
      },
      onError: error => {
        toast.error(`Failed to add product: ${error.message}`);
      },
      onSettled: () => {
        setIsAddModalOpen(false);
      },
    });
    // Would invalidate query cache after successful API call
  };

  const handleEditProduct = (formData: ProductFormData) => {
    if (!productToEdit) return;

    updateProduct(
      {
        ...formData,
        id: productToEdit.id,
      },
      {
        onSuccess: () => {
          toast.success('Product updated successfully!');
        },
        onError: error => {
          toast.error(`Failed to update product: ${error.message}`);
        },
        onSettled: () => {
          setIsAddModalOpen(false);
        },
      }
    );
    // This would call the API service to update a product
    // toast.success('Product update functionality will be implemented soon');
    // setIsEditModalOpen(false);
    // // Would invalidate query cache after successful API call
  };

  const handleDeleteProduct = async (id: number) => {
    if (!productToDelete) return;

    deleteProduct(id, {
      onSuccess: () => {
        toast.success('Product deleted successfully!');
      },
      onError: error => {
        toast.error(`Failed to delete product: Product in use.`);
      },
      onSettled: () => {
        setIsDeleteModalOpen(false);
      },
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold tracking-tight'>Products</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[700px]'>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new product.
              </DialogDescription>
            </DialogHeader>
            <ProductsForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className='w-[100px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className='h-6 w-[180px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-[80px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-[60px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-[120px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-[80px]' />
                  </TableCell>
                </TableRow>
              ))
            ) : products && products.length > 0 ? (
              // Data loaded
              products.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell className='font-medium'>{product.title}</TableCell>
                  <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {product.category?.title || 'Uncategorized'}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setProductToEdit(product);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setProductToDelete(product);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className='h-4 w-4 text-red-500' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // No data
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  No products found. Create your first product.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='sm:max-w-[700px]'>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details of this product.
            </DialogDescription>
          </DialogHeader>
          {productToEdit && (
            <ProductsForm
              initialData={{
                title: productToEdit.title,
                description: productToEdit.description,
                price: parseFloat(productToEdit.price),
                stock: productToEdit.stock,
                images: productToEdit.images.map(img => ''),
                categoryId: productToEdit.category?.id,
              }}
              onSubmit={handleEditProduct}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the product "
              {productToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end gap-2 mt-4'>
            <Button
              variant='outline'
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={() => {
                if (productToDelete) {
                  handleDeleteProduct(productToDelete.id);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsSection;
