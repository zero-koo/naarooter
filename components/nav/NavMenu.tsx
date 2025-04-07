'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export function NavMenu({
  link,
  icon,
  children,
}: {
  link: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isActive = pathName === link;

  return (
    <Link href={link}>
      <button
        className={cn(
          'flex h-10 w-full items-center rounded-lg px-2.5 text-left text-sm font-normal hover:bg-primary/10',
          {
            '!bg-primary/20 font-bold': isActive,
          }
        )}
      >
        {icon && <div className="mr-2.5 shrink-0">{icon}</div>}
        <span className="truncate">{children}</span>
      </button>
    </Link>
  );
}
