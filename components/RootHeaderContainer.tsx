'use client';

import Link from 'next/link';

import { useUser } from '@/hooks/useUser';

import SignIn from './auth/SignIn';
import SideNavToggle from './SideNavToggle';
import UserButton from './UserButton';

const RootHeaderContainer = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useUser();

  return (
    <header className={'flex w-full items-center gap-2 p-2'}>
      <SideNavToggle />
      <Link
        className="text-l bg-primary text-primary-foreground mr-auto rounded-lg px-1.5 py-0.5 font-extrabold"
        href={'/'}
      >
        Na
      </Link>
      <>
        {user ? (
          <>
            {children}
            <UserButton />
          </>
        ) : (
          <SignIn />
        )}
      </>
    </header>
  );
};

export default RootHeaderContainer;
