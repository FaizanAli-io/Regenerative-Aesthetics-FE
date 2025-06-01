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
        )}
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
      </div>
      <span className='text-sm font-medium'>{label}</span>
    </div>
  );
}

export default NavItem;
