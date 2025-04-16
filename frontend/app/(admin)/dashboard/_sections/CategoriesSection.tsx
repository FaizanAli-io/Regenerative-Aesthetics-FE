'use client';

import React, { useState, useMemo } from 'react';
import { useCategories } from '@/lib/hooks/categories/use-categories';
import CategoryForm from '../_forms/CategoryForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import type { Category } from '@/lib/services/category-services';
import categoryService from '@/lib/services/category-services';
import { useQueryClient } from '@tanstack/react-query';
import { CATEGORIES_KEY } from '@/lib/hooks/_cache-keys';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useAddCategory } from '@/lib/hooks/categories/use-add-category';
import { useEditCategory } from '@/lib/hooks/categories/use-edit-categories';
import { useDeleteCategory } from '@/lib/hooks/categories/use-delete-category';

interface CategoryFormData {
  title: string;
  description: string;
  parentCategoryId?: number;
}

// Component for a single category row with its children
const CategoryRow = ({
  category,
  level = 0,
  onEdit,
  onDelete,
  expandedCategories,
  toggleExpand,
}: {
  category: Category;
  level?: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  expandedCategories: Set<number>;
  toggleExpand: (id: number) => void;
}) => {
  const hasChildren = category.children && category.children.length > 0;
  const isExpanded = expandedCategories.has(category.id);

  return (
    <>
      <TableRow key={category.id}>
        <TableCell className='font-medium'>
          <div className='flex items-center'>
            <div style={{ width: `${level * 20}px` }} />
            {hasChildren && (
              <Button
                variant='ghost'
                size='icon'
                className='h-5 w-5 mr-1'
                onClick={() => toggleExpand(category.id)}
              >
                {isExpanded ? (
                  <ChevronDown className='h-4 w-4' />
                ) : (
                  <ChevronRight className='h-4 w-4' />
                )}
              </Button>
            )}
            {!hasChildren && <div className='w-6' />}
            <span className={cn(level > 0 && 'font-normal')}>
              {category.title}
            </span>
          </div>
        </TableCell>
        <TableCell className='max-w-md truncate'>
          {category.description}
        </TableCell>
        <TableCell>{category.parentCategory?.title || 'None'}</TableCell>
        <TableCell>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onEdit(category)}
            >
              <Edit className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onDelete(category)}
            >
              <Trash2 className='h-4 w-4 text-red-500' />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Render children if category is expanded */}
      {isExpanded &&
        hasChildren &&
        category.children.map(childCategory => (
          <CategoryRow
            key={childCategory.id}
            category={childCategory}
            level={level + 1}
            onEdit={onEdit}
            onDelete={onDelete}
            expandedCategories={expandedCategories}
            toggleExpand={toggleExpand}
          />
        ))}
    </>
  );
};

const CategoriesSection = () => {
  const { data: categories, isLoading, error } = useCategories();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  const { mutate: addCategory } = useAddCategory();
  const { mutate: editCategory } = useEditCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  // Function to toggle category expansion
  const toggleExpand = (categoryId: number) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Derive root categories (categories without a parent)
  const rootCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter(category => !category.parentCategory);
  }, [categories]);

  const handleAddCategory = async (formData: CategoryFormData) => {
    addCategory(formData, {
      onSuccess: () => {
        toast.success('Category created successfully');
        setIsAddModalOpen(false);
      },
      onError: error => {
        console.error('Failed to create category:', error);
        toast.error('Failed to create category');
      },
    });
  };

  const handleEditCategory = async (formData: CategoryFormData) => {
    if (!categoryToEdit) return;

    editCategory({ ...formData, id: categoryToEdit.id });
  };

  const handleDeleteCategory = async (id: number) => {
    if (!categoryToDelete) return;

    deleteCategory(id);
    // try {
    //   await categoryService.delete(id).request;
    //   toast.success('Category deleted successfully');
    //   queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
    // } catch (error) {
    //   console.error('Failed to delete category:', error);
    //   toast.error('Failed to delete category');
    // }
  };

  if (error) {
    return (
      <div className='text-red-500'>
        Error loading categories: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold tracking-tight'>Categories</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[700px]'>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new product category.
              </DialogDescription>
            </DialogHeader>
            <CategoryForm onSubmit={handleAddCategory} />
          </DialogContent>
        </Dialog>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Parent Category</TableHead>
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
                    <Skeleton className='h-6 w-[250px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-[150px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-[80px]' />
                  </TableCell>
                </TableRow>
              ))
            ) : rootCategories && rootCategories.length > 0 ? (
              // Data loaded - only show root categories at first level
              rootCategories.map(category => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  onEdit={cat => {
                    setCategoryToEdit(cat);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={cat => {
                    setCategoryToDelete(cat);
                    setIsDeleteModalOpen(true);
                  }}
                  expandedCategories={expandedCategories}
                  toggleExpand={toggleExpand}
                />
              ))
            ) : (
              // No data
              <TableRow>
                <TableCell colSpan={4} className='h-24 text-center'>
                  No categories found. Create your first category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View All Categories Button */}
      {!isLoading && categories && categories.length > 0 && (
        <div className='flex justify-end'>
          <Button
            variant='outline'
            onClick={() => {
              // If all are expanded, collapse all; otherwise expand all
              if (
                expandedCategories.size ===
                categories.filter(c => c.children.length > 0).length
              ) {
                setExpandedCategories(new Set());
              } else {
                setExpandedCategories(
                  new Set(
                    categories.filter(c => c.children.length > 0).map(c => c.id)
                  )
                );
              }
            }}
          >
            {expandedCategories.size ===
            categories.filter(c => c.children.length > 0).length
              ? 'Collapse All'
              : 'Expand All'}
          </Button>
        </div>
      )}

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='sm:max-w-[700px]'>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the details of this category.
            </DialogDescription>
          </DialogHeader>
          {categoryToEdit && (
            <CategoryForm
              initialData={{
                title: categoryToEdit.title,
                description: categoryToEdit.description,
                parentCategoryId: categoryToEdit.parentCategory?.id,
              }}
              onSubmit={handleEditCategory}
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
              Are you sure you want to delete the category "
              {categoryToDelete?.title}"? This action cannot be undone.
              {categoryToDelete && categoryToDelete?.children.length > 0 && (
                <p className='mt-2 text-red-500 font-medium'>
                  Warning: This category has {categoryToDelete.children.length}{' '}
                  subcategories that will also be deleted.
                </p>
              )}
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
                if (categoryToDelete) {
                  handleDeleteCategory(categoryToDelete.id);
                  setIsDeleteModalOpen(false);
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

export default CategoriesSection;
