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
        {icon === 'home' && (
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
            <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
            <polyline points='9 22 9 12 15 12 15 22' />
          </svg>
        )}
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
        {icon === 'customers' && (
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
        {icon === 'analytics' && (
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
            <line x1='18' y1='20' x2='18' y2='10' />
            <line x1='12' y1='20' x2='12' y2='4' />
            <line x1='6' y1='20' x2='6' y2='14' />
          </svg>
        )}
        {icon === 'marketing' && (
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
            <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
          </svg>
        )}
        {icon === 'discounts' && (
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
            <line x1='19' y1='5' x2='5' y2='19' />
            <circle cx='6.5' cy='6.5' r='2.5' />
            <circle cx='17.5' cy='17.5' r='2.5' />
          </svg>
        )}
      </div>
      <span className='text-sm font-medium'>{label}</span>
    </div>
  );
}

export default NavItem;
