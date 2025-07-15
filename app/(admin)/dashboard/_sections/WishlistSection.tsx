'use client';
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUsers } from '@/lib/hooks/use-all-users';
import UserRow from '../_components/UserRow';
import { useWishlistAll } from '@/lib/hooks/wishlist/use-wishlist-all';
import WishlistRow from '../_components/WishlistRow';

const WishlistSection: React.FC = () => {
  const { data: wishlist, isLoading, isFetched } = useWishlistAll();

  const renderWishlist = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={6}>Loading...</td>
        </tr>
      );
    }

    if (!wishlist || !wishlist.wishlistItems.length)
      return (
        <tr>
          <td colSpan={6}>No items found</td>
        </tr>
      );

    return wishlist.wishlistItems.map(item => (
      <WishlistRow
        product={item.product.title}
        username={item.user.name}
        email={item.user.email}
        added={new Date(item.createdAt)}
      />
    ));
  };

  return (
    <Card>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='p-3 text-left'>Product</th>
                <th className='p-3 text-left'>Username</th>
                <th className='p-3 text-left'>Email</th>
                <th className='p-3 text-left'>Added on</th>
              </tr>
            </thead>
            <tbody>{renderWishlist()}</tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistSection;
