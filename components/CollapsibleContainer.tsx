import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

type CollapsibleContainerProps = React.PropsWithChildren<{
  maxAllowableHeight: number;
  collapsedHeight: number;
  extendText?: string;
}>;

export default function CollapsibleContainer({
  children,
  maxAllowableHeight,
  collapsedHeight,
  extendText,
}: CollapsibleContainerProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [shouldCollapse, setShouldCollapse] = useState(false);

  useEffect(() => {
    if (!innerRef.current) return;
    setShouldCollapse(innerRef.current.scrollHeight > maxAllowableHeight);
  }, [maxAllowableHeight]);

  return (
    <div
      className={cn('relative', {
        'overflow-hidden': shouldCollapse && collapsed,
      })}
      style={{
        height: shouldCollapse && collapsed ? `${collapsedHeight}px` : 'auto',
      }}
    >
      <div ref={innerRef}>{children}</div>
      {shouldCollapse && collapsed && (
        <div className="absolute inset-x-0 bottom-0 flex h-[50px] items-end justify-center pb-1.5 shadow-[inset_0_-50px_15px_-15px_hsl(var(--b3))]">
          <button
            className="text-xs font-semibold text-base-content"
            onClick={(e) => {
              setCollapsed(false);
              e.stopPropagation();
            }}
          >
            {extendText ?? '자세히 보기'}
          </button>
        </div>
      )}
    </div>
  );
}
