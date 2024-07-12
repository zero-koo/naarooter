import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const switchVariants = cva(
  'flex gap-0.5 rounded border border-base-content/30 p-0.5',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'p-1',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

const switchItemVariants = cva(
  'flex-center flex cursor-pointer rounded hover:text-primary-content has-[:checked]:bg-primary has-[:checked]:text-primary-content',
  {
    variants: {
      size: {
        sm: 'min-w-6 p-0.5 text-xs',
        md: 'min-w-10 px-2 py-1 text-sm',
        lg: 'min-w-12 px-2 py-1',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

type SwitchProps<Value extends string> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onSelect'
> &
  VariantProps<typeof switchVariants> & {
    items: Array<{
      value: Value;
      text?: string;
      render?: React.FC;
    }>;
    selected: Value;
    size?: 'sm' | 'md' | 'lg';
    onSelect: (value: Value) => void;
  };

export default function Switch<Value extends string>({
  items,
  selected,
  className,
  size,
  onSelect,
}: SwitchProps<Value>) {
  return (
    <div className={cn(switchVariants({ size }), className)}>
      {items.map(({ value, text, render }) => {
        const Item = render ?? (() => <>{text}</>);
        return (
          <label key={value} className={cn(switchItemVariants({ size }))}>
            <input
              type="radio"
              checked={value === selected}
              value={value}
              className="appearance-none"
              onChange={(e) => {
                e.target.checked && onSelect(value);
              }}
            />
            <Item />
          </label>
        );
      })}
    </div>
  );
}
