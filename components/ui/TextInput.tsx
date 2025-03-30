import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textInputVariants = cva(
  'flex w-full px-2.5 placeholder:text-base-content/50 focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 text-sm',
        xs: 'h-8 px-2 text-xs',
        sm: 'h-9 px-2 text-sm',
        lg: 'h-12 px-3 font-semibold',
      },
      outline: {
        false: null,
        true: 'rounded border border-base-content/30',
      },
      error: {
        false: null,
        true: 'text-error',
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
  VariantProps<typeof textInputVariants>;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, placeholder, size, outline, error, ...props }, ref) => {
    return (
      <input
        className={cn(textInputVariants({ size, outline, error, className }))}
        ref={ref}
        placeholder={placeholder ?? '입력하세요..'}
        {...props}
      />
    );
  }
);
TextInput.displayName = 'TextInput';

export default TextInput;
