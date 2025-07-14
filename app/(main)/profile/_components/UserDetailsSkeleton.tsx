import { Skeleton } from '@/components/ui/skeleton';
import { TableRow, TableCell } from '@/components/ui/table';
import React from 'react';

const Row = () => {
  return (
    <TableRow>
      {new Array(5).fill(null).map((_, i) => (
        <TableCell key={i}>
          <Skeleton className='w-20 h-5 py-4' />
        </TableCell>
      ))}
    </TableRow>
  );
};

const UserDetailsSkeleton = () => {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <Row key={i} />
        ))}
    </>
  );
};

export default UserDetailsSkeleton;
