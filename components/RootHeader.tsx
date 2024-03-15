'use client';

import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';

import { Button } from './Button';
import SearchBox from './SearchBox';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';

const RootHeader = () => {
  const { userId } = useAuth();
  const { setSearchParams } = useURLSearchParams();

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
            <SearchBox onSubmit={(value) => setSearchParams('search', value)} />
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

export default RootHeader;
