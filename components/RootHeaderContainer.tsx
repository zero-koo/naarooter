'use client';

import Link from 'next/link';
import UserButton from './UserButton';
import SignIn from './auth/SignIn';
import { useUser } from '@/hooks/useUser';
import SideNavToggle from './SideNavToggle';

const RootHeaderContainer = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useUser();

  return (
    <header className={'flex items-center gap-2 p-2'}>
      <SideNavToggle />
      <Link
        className="text-l mr-auto rounded-lg bg-primary px-1.5 py-0.5 font-extrabold text-white"
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
