'use client';

import { cn } from '@/lib/utils';
import { Black_Han_Sans } from 'next/font/google';
import Link from 'next/link';

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
          className="font-italic font-semibold text-primary-content/90"
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
