import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full bg-base-300 p-2 text-sm placeholder:text-base-content/50 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        placeholder={placeholder ?? '입력하세요..'}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'TextArea';

export default TextArea;
