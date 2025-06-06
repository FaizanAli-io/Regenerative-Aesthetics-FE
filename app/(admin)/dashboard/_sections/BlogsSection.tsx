'use client';

import React, { useState } from 'react';
import { useBlogs } from '@/lib/hooks/blogs/use-blogs';
import { useAddBlog } from '@/lib/hooks/blogs/use-add-blog';
import { useEditBlog } from '@/lib/hooks/blogs/use-edit-blog';
import { useDeleteBlog } from '@/lib/hooks/blogs/use-delete-blog';
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
import BlogForm from '../_forms/BlogForm';
import type { Blog, BlogFormData } from '@/lib/services/blog-service';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const BlogsSection = () => {
  const { data: blogs, isLoading, isError } = useBlogs();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  const { mutate: addBlog, isPending: isAddingBlog } = useAddBlog();
  const { mutate: updateBlog, isPending: isUpdatingBlog } = useEditBlog();
  const { mutate: deleteBlog, isPending: isDeletingBlog } = useDeleteBlog();

  const handleAddBlog = (formData: BlogFormData) => {
    addBlog(formData, {
      onSuccess: () => {
        setIsAddModalOpen(false);
      },
    });
  };

  const handleEditBlog = (formData: BlogFormData) => {
    if (!blogToEdit) return;

    const updatedBlog: Blog = {
      ...blogToEdit,
      ...formData,
    };

    updateBlog(updatedBlog, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setBlogToEdit(null);
      },
    });
  };
  const handleDeleteBlog = () => {
    if (!blogToDelete) return;

    deleteBlog(blogToDelete.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setBlogToDelete(null);
      },
    });
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  if (isError) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500'>
          Error loading blogs. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Blogs Management</h2>
          <p className='text-gray-600'>Manage your blog posts and articles</p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='w-4 h-4 mr-2' />
              Add Blog
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle>Create New Blog</DialogTitle>
              <DialogDescription>
                Add a new blog post to your website. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <BlogForm
              onSubmit={handleAddBlog}
              isLoading={isAddingBlog}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Blogs Table */}
      <div className='bg-white rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>{' '}
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className='h-12 w-16 rounded' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[200px]' />
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Skeleton className='h-8 w-8' />
                      <Skeleton className='h-8 w-8' />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : blogs && blogs.length > 0 ? (
              // Data loaded
              blogs.map((blog: Blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    {blog.image_url ? (
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className='h-12 w-16 object-cover rounded border'
                      />
                    ) : (
                      <div className='h-12 w-16 bg-gray-100 rounded border flex items-center justify-center'>
                        <span className='text-xs text-gray-400'>No image</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {truncateText(blog.title, 40)}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2 justify-end'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setBlogToEdit(blog);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className='w-4 h-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setBlogToDelete(blog);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className='w-4 h-4 text-red-600' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // No data
              <TableRow>
                <TableCell
                  colSpan={3}
                  className='text-center py-8 text-gray-500'
                >
                  No blogs found. Create your first blog post!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              Update the blog post details below.
            </DialogDescription>
          </DialogHeader>
          <BlogForm
            onSubmit={handleEditBlog}
            initialData={blogToEdit || undefined}
            isLoading={isUpdatingBlog}
            onCancel={() => {
              setIsEditModalOpen(false);
              setBlogToEdit(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{blogToDelete?.title}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteModalOpen(false);
                setBlogToDelete(null);
              }}
              disabled={isDeletingBlog}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBlog}
              disabled={isDeletingBlog}
              className='bg-red-600 hover:bg-red-700'
            >
              {isDeletingBlog ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogsSection;
