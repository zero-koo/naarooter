import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

const ChartCellPopover = ({
  children,
  count,
  choice,
  mbti,
  className,
  style,
  align = 'start',
  side = 'bottom',
  alignOffset = 0,
  sideOffset = 0,
  collisionPadding = 5,
}: {
  children: React.ReactNode;
  count: number;
  choice: string;
  mbti: string;
  className?: string;
  style?: CSSProperties;
  align?: 'start' | 'center' | 'end';
  side?: 'bottom' | 'top' | 'right' | 'left';
  alignOffset?: number;
  sideOffset?: number;
  collisionPadding?: number;
}) => {
  return (
    <Popover>
      <PopoverTrigger className={cn('relative', className)} style={style}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        className="min-w-[40px] max-w-[100px] overflow-hidden rounded-md border-none bg-popover/80 p-1 px-1.5 text-xs leading-normal"
        align={align}
        side={side}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <div>
          <span className="font-semibold">{count}</span>
          <span className="ml-[1px] text-[8px]">명</span>
        </div>
        <div className="gap-x-0.5 text-[8px]">
          <div className="truncate">{choice}</div>
          <div>{mbti}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChartCellPopover;
