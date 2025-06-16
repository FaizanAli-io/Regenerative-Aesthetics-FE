'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import React, { useState } from 'react';

interface Props {
  limit: number;
  pageSize?: number;
  onClick: (page: number) => void;
  initialPage?: number;
}

const PaginationUI = ({
  limit,
  pageSize = 10,
  onClick,
  initialPage = 1,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(limit / pageSize);

  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onClick(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1);
    }
  };
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2; // Number of pages to show on each side of current page
    const range: number[] = [];
    const rangeWithDots: (number | 'ellipsis')[] = [];

    // Calculate the range around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show first page
    rangeWithDots.push(1);

    // Add ellipsis if there's a gap after page 1
    if (currentPage - delta > 2) {
      rangeWithDots.push('ellipsis');
    }

    // Add the range around current page (excluding first and last if already added)
    range.forEach(page => {
      if (page !== 1 && page !== totalPages) {
        rangeWithDots.push(page);
      }
    });

    // Add ellipsis if there's a gap before last page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('ellipsis');
    }

    // Always show last page if there are more than 1 pages
    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    // Remove duplicates while preserving order
    const result: (number | 'ellipsis')[] = [];
    rangeWithDots.forEach(item => {
      if (item === 'ellipsis') {
        // Only add ellipsis if the last item isn't already an ellipsis
        if (result[result.length - 1] !== 'ellipsis') {
          result.push(item);
        }
      } else {
        // Only add number if it's not already in result
        if (!result.includes(item)) {
          result.push(item);
        }
      }
    });

    return result;
  };

  const getPaginationItems = () => {
    const pageNumbers = getPageNumbers();

    return pageNumbers.map((pageNumber, index) => {
      if (pageNumber === 'ellipsis') {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            href='#'
            isActive={pageNumber === currentPage}
            onClick={e => {
              e.preventDefault();
              handleClick(pageNumber);
            }}
            className='cursor-pointer'
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={e => {
              e.preventDefault();
              handlePrevious();
            }}
            className={`cursor-pointer ${
              currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
            }`}
          />
        </PaginationItem>

        {getPaginationItems()}

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={e => {
              e.preventDefault();
              handleNext();
            }}
            className={`cursor-pointer ${
              currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationUI;
