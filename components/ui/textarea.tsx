import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full p-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-base-content/50 bg-base-300',
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
