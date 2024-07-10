'use client';

import Link from 'next/link';
import UserButton from './UserButton';
import SignIn from './auth/SignIn';
import { useUser } from '@/hooks/useUser';

const RootHeaderContainer = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useUser();

  return (
    <header className={'flex items-center gap-3 p-2'}>
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
