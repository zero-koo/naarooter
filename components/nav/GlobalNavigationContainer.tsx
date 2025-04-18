'use client';

import { Black_Han_Sans } from 'next/font/google';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
});

const GlobalNavigationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <nav className="flex flex-col">
      <div className={cn(['mb-4 px-2.5', blackHanSans.className])}>
        <Link
          className="font-italic text-foreground/90 font-semibold"
          href={'/'}
        >
          Coconut Space
        </Link>
      </div>
      {children}
    </nav>
  );
};

export default GlobalNavigationContainer;
