import { cn } from '@/lib/utils';

import { Label } from './Label';

type SelectableLabelProps = Pick<
  React.ComponentProps<typeof Label>,
  'size' | 'className' | 'children'
> & {
  size?: 'md' | 'lg';
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onSelect?: (selected: boolean) => void;
};

export function SelectableLabel({
  size = 'md',
  selected,
  disabled,
  className,
  onClick,
  onSelect,
  children,
  ...props
}: SelectableLabelProps) {
  return (
    <label
      className={cn('cursor-pointer', disabled && 'cursor-not-allowed')}
      onClick={(e) => onClick?.(e)}
    >
      <Label
        variant="outline"
        className={cn(className, selected && 'border-primary text-primary')}
        size={size}
        rounded
        {...props}
      >
        <input
          type="checkbox"
          className={'appearance-none'}
          disabled={disabled}
          checked={selected}
          onChange={(e) => {
            onSelect?.(e.target.checked);
          }}
        />
        <span>{children}</span>
      </Label>
    </label>
  );
}
