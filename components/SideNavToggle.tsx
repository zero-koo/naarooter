import { MenuIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

import GlobalNavigation from './nav/GlobalNavigation';
import { Sheet, SheetContent, SheetTrigger } from './ui/Sheet';

const SideNavToggle = () => {
  const session = useSession();

  return (
    <Sheet>
      <SheetTrigger className="flex size-8 items-center justify-center md:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={'left'} className="w-[250px]">
        <div className="p-2 py-3">
          <GlobalNavigation isLoggedIn={!!session.data?.user} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavToggle;
