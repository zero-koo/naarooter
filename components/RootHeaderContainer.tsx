'use client';

import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import { Button } from './Button';

const RootHeaderContainer = ({ children }: { children?: React.ReactNode }) => {
  const { userId } = useAuth();

  return (
    <header className={'flex items-center gap-3 p-2'}>
      <Link
        className="text-l mr-auto rounded-lg bg-primary px-1.5 py-0.5 font-extrabold text-white"
        href={'/'}
      >
        Na
      </Link>
      <>
        {userId ? (
          <>
            {children}
            <UserButton afterSignOutUrl="/sign-in" />
          </>
        ) : (
          <Link href={'/sign-in'}>
            <Button theme="primary">login</Button>
          </Link>
        )}
      </>
    </header>
  );
};

export default RootHeaderContainer;
