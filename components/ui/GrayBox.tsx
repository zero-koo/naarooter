import { cn } from '@/lib/utils';
import React from 'react';

export type GrayBoxProps = React.HTMLAttributes<HTMLDivElement>;

const GrayBox = ({ className, ...props }: GrayBoxProps) => {
  return (
    <div className={cn('bg-base-200 md:rounded-lg', className)} {...props} />
  );
};

export default GrayBox;
