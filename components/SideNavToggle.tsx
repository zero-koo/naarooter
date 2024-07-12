import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/Sheet';
import GlobalNavigation from './nav/GlobalNavigation';

const SideNavToggle = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex h-8 w-8 items-center justify-center md:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={'left'} className="w-[250px]">
        <div className="p-2 py-3">
          <GlobalNavigation />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavToggle;
