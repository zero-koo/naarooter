'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
          'flex items-center rounded-lg h-10 my-0.5 px-2.5 w-full text-left font-normal text-sm hover:bg-primary/20',
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
