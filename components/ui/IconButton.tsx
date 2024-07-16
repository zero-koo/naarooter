import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
  'not:disabled:hover:text-base-content/80 pointer-events-auto flex items-center justify-center p-0 text-base-content/60',
  {
    variants: {
      variant: {
        default: 'btn-neutral',
        primary: 'btn-primary',
        accent: 'btn-accent',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
        ghost: 'not:disabled:hover:bg-base-content/10',
      },
      size: {
        default: 'size-10 rounded',
        xs: 'size-7 rounded text-xs',
        sm: 'size-9 rounded-sm',
        lg: 'h-11 rounded-lg',
      },
      shape: {
        square: '',
        circle: 'rounded-full!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'square',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants>;

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, shape, className }))}
        type="button"
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
