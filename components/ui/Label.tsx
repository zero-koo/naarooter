import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'flex w-fit select-none items-center overflow-hidden rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary-content/20',
        primary:
          'text-primary-foreground border-transparent bg-primary hover:bg-primary/80',
        secondary:
          'text-secondary-foreground border-transparent bg-secondary hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border-primary-content/20 text-foreground',
      },
      size: {
        sm: 'px-1 text-xxs',
        md: 'text-md px-1.5 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface LabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof labelVariants> {
  closable?: boolean;
  onClose?: () => void;
}

function Label({
  className,
  variant,
  size,
  closable,
  onClose,
  children,
  ...props
}: LabelProps) {
  return (
    <div className={cn(labelVariants({ variant, size }), className)} {...props}>
      <div className="truncate">{children}</div>
      {closable && (
        <button
          className="flex-center -mr-0.5 ml-0.5 rounded p-0.5 hover:bg-base-100/20"
          onClick={onClose}
        >
          <XIcon size={12} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

export { Label, labelVariants };
