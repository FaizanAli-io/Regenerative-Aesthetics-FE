'use client';

import WelcomeSection from './_components/WelcomeSection';
import useSidebarStore from '@/lib/stores/dashboard-sidebar-store';
import OrdersSection from './_sections/OrdersSection';
import UsersSection from './_sections/UsersSecton';
import ProductsSection from './_sections/ProductsSection';
import CategoriesSection from './_sections/CategoriesSection';
import BlogsSection from './_sections/BlogsSection';
import WishlistSection from './_sections/WishlistSection';
import ReviewsSection from './_sections/ReviewsSection';
import { ProtectedPage } from '@/app/components/ProtectedPage';

export default function AdminPanel() {
  const activeIndex = useSidebarStore(state => state.activeIndex);
  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <OrdersSection />;
      case 1:
        return <ProductsSection />;
      case 2:
        return <UsersSection />;
      case 3:
        return <CategoriesSection />;
      case 4:
        return <BlogsSection />;
      case 5:
        return <WishlistSection />;
      case 6:
        return <ReviewsSection />;
    }
  };

  return (
    <ProtectedPage>
      <main className='flex-1 overflow-auto p-6'>
        <div className='max-w-6xl mx-auto'>
          <WelcomeSection />
          {renderContent()}
        </div>
      </main>
    </ProtectedPage>
  );
}
