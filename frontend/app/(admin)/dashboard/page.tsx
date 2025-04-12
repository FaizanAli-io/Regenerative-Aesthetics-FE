import WelcomeSection from './_components/WelcomeSection';
import OrdersSection from './_components/OrdersSection';

export default function AdminPanel() {
  return (
    <main className='flex-1 overflow-auto p-6'>
      <div className='max-w-6xl mx-auto'>
        <WelcomeSection />
        <OrdersSection />
      </div>
    </main>
  );
}
