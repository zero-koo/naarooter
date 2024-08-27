'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';
import LoadingDots from '@/components/ui/LoadingDots';

export const InfiniteScrollTrigger: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage(): void;
  }
> = ({ hasNextPage, isFetchingNextPage, fetchNextPage, className }) => {
  const { ref } = useInView({
    onChange(inView) {
      hasNextPage && inView && !isFetchingNextPage && fetchNextPage();
    },
  });

  return (
    <div ref={ref} className={cn('flex-center h-10 w-full', className)}>
      {isFetchingNextPage && <LoadingDots />}
    </div>
  );
};
