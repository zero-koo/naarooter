import { MenuIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/Sheet';
import GlobalNavigation from './nav/GlobalNavigation';

type CommunityHeaderProps = {
  title: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
};

const CommunityHeader = ({ title, left, right }: CommunityHeaderProps) => {
  return (
    <div className="relative flex h-12 items-center justify-between bg-base-300">
      {left ?? <NavMenuToggle />}
      <h1 className="absolute left-1/2 flex -translate-x-1/2 items-center text-lg font-semibold">
        {title}
      </h1>
      {right}
    </div>
  );
};

export default CommunityHeader;

const NavMenuToggle = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex h-12 w-12 items-center justify-center">
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
