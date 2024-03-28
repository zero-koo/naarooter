import { cn } from '@/lib/utils';

export function NavMenuIcon({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'text-md flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100/10 font-semibold',
        {
          'bg-primary-content/90 text-primary-focus': active,
        }
      )}
    >
      {children}
    </div>
  );
}
