import * as React from 'react';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const textInputVariants = cva(
  'flex w-full px-2 placeholder:text-base-content/50 focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10',
        xs: 'h-8 text-xs',
        sm: 'h-9 text-sm',
        lg: 'h-12 text-lg font-semibold',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  VariantProps<typeof textInputVariants> & {
    border?: boolean;
    error?: boolean;
  };

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, placeholder, size, border, error, ...props }, ref) => {
    return (
      <input
        className={cn(textInputVariants({ size, className }), {
          'border border-base-content/30': border,
          'text-error': error,
        })}
        ref={ref}
        placeholder={placeholder ?? '입력하세요..'}
        {...props}
      />
    );
  }
);
TextInput.displayName = 'TextInput';

export default TextInput;
