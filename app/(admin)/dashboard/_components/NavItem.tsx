'use client';

import useSidebarStore from '@/lib/stores/dashboard-sidebar-store';

function NavItem({
  icon,
  label,
  index,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
  index: number;
}) {
  const setActiveIndex = useSidebarStore(state => state.setActiveIndex);

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
        active ? 'bg-white text-green-600' : 'text-gray-600 hover:bg-white/50'
      }`}
      onClick={() => setActiveIndex(index)}
    >
      <div className='w-5 h-5 flex items-center justify-center'>
        {icon === 'orders' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-5 h-5'
          >
            <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' />
            <line x1='3' y1='6' x2='21' y2='6' />
            <path d='M16 10a4 4 0 0 1-8 0' />
          </svg>
        )}
        {icon === 'products' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-5 h-5'
          >
            <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' />
            <polyline points='3.27 6.96 12 12.01 20.73 6.96' />
            <line x1='12' y1='22.08' x2='12' y2='12' />
          </svg>
        )}{' '}
        {icon === 'users' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-5 h-5'
          >
            <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
            <circle cx='9' cy='7' r='4' />
            <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
            <path d='M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
        )}
        {icon === 'categories' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-5 h-5'
          >
            <rect width='7' height='7' x='3' y='3' rx='1' />
            <rect width='7' height='7' x='14' y='3' rx='1' />
            <rect width='7' height='7' x='14' y='14' rx='1' />
            <rect width='7' height='7' x='3' y='14' rx='1' />
          </svg>
        )}
        {icon === 'blogs' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-5 h-5'
          >
            <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
            <polyline points='14 2 14 8 20 8' />
            <line x1='16' y1='13' x2='8' y2='13' />
            <line x1='16' y1='17' x2='8' y2='17' />
            <polyline points='10 9 9 9 8 9' />
          </svg>
        )}
        {icon === 'wishlist' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <rect x='3' y='8' width='18' height='4' rx='1' />
            <path d='M12 8v13' />
            <path d='M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7' />
            <path d='M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5' />
          </svg>
        )}
        {icon === 'reviews' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
          </svg>
        )}
      </div>
      <span className='text-sm font-medium'>{label}</span>
    </div>
  );
}

export default NavItem;
