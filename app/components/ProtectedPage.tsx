'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // setIsAuthenticated(!!localStorage.getItem('access_token')); // Replace with your auth logic
  //   if (!isAuthenticated) {
  //     router.push('/auth');
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [isAuthenticated, router]);

  // if (isLoading) {
  // return <p>Loading...</p>;
  // }

  // return isAuthenticated ? <>{children}</> : null;
  return <>{children}</>;
};
