import * as React from 'react';
import { Size } from '@/types/style';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-primary-content/20 bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'text-secondary-foreground bg-secondary hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: '!h-auto !p-0 text-primary underline-offset-4 hover:underline',
        text: '!h-auto !p-0 underline underline-offset-4',
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 rounded-md px-3',
        md: 'h-10 rounded-lg px-4',
        lg: 'h-12 gap-2 rounded-xl px-5 text-lg',
        icon: 'size-10',
      },
      loading: {
        false: null,
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  LeftIcon?: React.FC<{ size?: number | string }>;
  RightIcon?: React.FC<{ size?: number | string }>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = 'md',
      loading,
      children,
      LeftIcon,
      RightIcon,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }), {
          'pl-4': !!LeftIcon && size === 'lg',
          'pl-3': !!LeftIcon && size === 'md',
          'pl-2': !!LeftIcon && size === 'sm',
          'pl-1.5': !!LeftIcon && size === 'xs',
          'pr-4': !!RightIcon && size === 'lg',
          'pr-3': !!RightIcon && size === 'md',
          'pr-2': !!RightIcon && size === 'sm',
          'pr-1.5': !!RightIcon && size === 'xs',
        })}
        ref={ref}
        {...props}
      >
        {LeftIcon && size !== 'icon' && (
          <LeftIcon size={iconSizeMap[size ?? 'md']} />
        )}
        {children}
        {RightIcon && size !== 'icon' && (
          <RightIcon size={iconSizeMap[size ?? 'md']} />
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

const iconSizeMap: Record<Size, number> = {
  lg: 24,
  md: 20,
  sm: 16,
  xs: 12,
};

export { Button, buttonVariants };
