import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const WelcomeSection: React.FC = () => {
  return (
    <div className='mb-8 relative'>
      <div className='absolute right-0 top-0 w-full h-full'>
        <div className='absolute right-0 top-0 w-full h-full opacity-10'>
          <svg
            width='100%'
            height='100%'
            viewBox='0 0 400 400'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g opacity='0.5'>
              <circle cx='50' cy='50' r='10' fill='#34D399' />
              <circle cx='100' cy='100' r='8' fill='#34D399' />
              <circle cx='150' cy='50' r='12' fill='#34D399' />
              <circle cx='200' cy='150' r='10' fill='#34D399' />
              <circle cx='250' cy='100' r='8' fill='#34D399' />
              <circle cx='300' cy='200' r='12' fill='#34D399' />
              <circle cx='350' cy='150' r='10' fill='#34D399' />
              <circle cx='50' cy='200' r='8' fill='#34D399' />
              <circle cx='100' cy='250' r='12' fill='#34D399' />
              <circle cx='150' cy='300' r='10' fill='#34D399' />
              <circle cx='200' cy='250' r='8' fill='#34D399' />
              <circle cx='250' cy='350' r='12' fill='#34D399' />
              <circle cx='300' cy='300' r='10' fill='#34D399' />
              <circle cx='350' cy='350' r='8' fill='#34D399' />
            </g>
          </svg>
        </div>
      </div>
      <h1 className='text-3xl font-bold text-gray-800 relative z-10'>
        Hi, Welcome !
      </h1>
      <p className='text-gray-500 relative z-10'>
        You're off to a great start.
      </p>
      <div className='mt-4 relative z-10'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          <Input placeholder='Search...' className='pl-10 w-full max-w-xs' />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
