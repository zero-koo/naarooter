'use client';

import { useUser } from '@/hooks/useUser';

import SignIn from './auth/SignIn';
import SideNavToggle from './SideNavToggle';
import UserButton from './UserButton';

const RootHeaderContainer = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useUser();

  return (
    <header className={'flex w-full items-center gap-2 p-2'}>
      <SideNavToggle />

      <div className="ml-auto flex items-center gap-2">
        {user ? (
          <>
            {children}
            <UserButton />
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </header>
  );
};

export default RootHeaderContainer;
