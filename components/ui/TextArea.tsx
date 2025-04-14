import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textAreaVariants = cva(
  'flex w-full bg-transparent p-2 text-sm placeholder:text-foreground/50 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      outline: {
        false: null,
        true: 'rounded-md border border-foreground/30',
      },
      error: {
        false: null,
        true: 'text-error',
      },
    },
    defaultVariants: {
      outline: false,
      error: false,
    },
  }
);

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textAreaVariants>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, outline, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(textAreaVariants({ outline, error, className }))}
        placeholder={placeholder ?? '입력하세요..'}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'TextArea';

export default TextArea;
