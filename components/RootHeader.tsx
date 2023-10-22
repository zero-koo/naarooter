import Link from 'next/link';
import { auth, UserButton } from '@clerk/nextjs';

import { Button } from './Button';

const RootHeader = () => {
  const { userId } = auth();

  return (
    <header className={'flex items-center p-2'}>
      <Link
        className="text-l rounded-lg bg-primary px-1.5 py-0.5 font-extrabold text-white"
        href={'/'}
      >
        Na
      </Link>
      <div className={'ml-auto'}>
        {userId ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href={'/sign-in'}>
            <Button theme="primary">login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default RootHeader;
