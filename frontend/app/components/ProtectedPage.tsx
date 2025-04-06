'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);

    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
};
