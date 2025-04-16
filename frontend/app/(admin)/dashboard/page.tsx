'use client';

import WelcomeSection from './_components/WelcomeSection';
import useSidebarStore from '@/lib/stores/dashboard-sidebar-store';
import OrdersSection from './_sections/OrdersSection';
import UsersSection from './_sections/UsersSecton';
import ProductsSection from './_sections/ProductsSection';
import CategoriesSection from './_sections/CategoriesSection';

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
    }
  };

  return (
    <main className='flex-1 overflow-auto p-6'>
      <div className='max-w-6xl mx-auto'>
        <WelcomeSection />
        {renderContent()}
      </div>
    </main>
  );
}
