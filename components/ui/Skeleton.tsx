import { cn } from '@/lib/utils';

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-base-content/20', className)}
      {...props}
    />
  );
}
