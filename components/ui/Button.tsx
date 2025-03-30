import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
        default: 'h-9 px-4 py-2',
        xs: 'h-7 rounded-sm px-2 text-xs',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-10',
      },
      loading: {
        false: null,
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
