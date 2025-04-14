import { cn } from '@/lib/utils';

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-foreground/20 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
