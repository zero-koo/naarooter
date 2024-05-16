import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const iconButtonVariants = cva('flex items-center justify-center p-0', {
  variants: {
    variant: {
      default: 'btn-neutral',
      primary: 'btn-primary',
      accent: 'btn-accent',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
      ghost: 'hover:bg-base-content/10',
    },
    size: {
      default: 'h-10 w-10',
      xs: 'h-8 w-8 text-xs',
      sm: 'h-9 w-9',
      lg: 'h-11',
    },
    shape: {
      square: 'rounded-sm',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    shape: 'circle',
  },
});

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
