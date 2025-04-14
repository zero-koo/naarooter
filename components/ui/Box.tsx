import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const boxVariants = cva('bg-base-100 md:rounded-lg', {
  variants: {
    bordered: {
      false: null,
      true: ['border bg-transparent'],
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

export type BoxProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants>;

const Box = ({ className, bordered, ...props }: BoxProps) => {
  return (
    <div className={cn(boxVariants({ bordered, className }))} {...props} />
  );
};

export default Box;
