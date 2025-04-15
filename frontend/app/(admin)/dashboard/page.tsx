'use client';

import WelcomeSection from './_components/WelcomeSection';
import useSidebarStore from '@/lib/stores/dashboard-sidebar-store';
import OrdersSection from './_sections/OrdersSection';
import UsersSection from './_sections/UsersSecton';

export default function AdminPanel() {
  const activeIndex = useSidebarStore(state => state.activeIndex);

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <OrdersSection />;
      case 1:
        return <h2 className='text-2xl font-bold mt-6'>Products</h2>;
      case 2:
        return <UsersSection />;
      default:
        return <OrdersSection />;
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
