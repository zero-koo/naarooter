'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { NavMenuIcon } from './NavMenuIcon';

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
          'my-0.5 flex h-10 w-full items-center rounded-lg px-2.5 text-left text-sm font-normal hover:bg-primary/20',
          {
            'bg-primary/20 font-bold': isActive,
          }
        )}
      >
        {icon && (
          <div className="mr-3">
            <NavMenuIcon active={isActive}>{icon}</NavMenuIcon>
          </div>
        )}
        {children}
      </button>
    </Link>
  );
}
