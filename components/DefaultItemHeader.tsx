import { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type DefaultItemHeaderProps = {
  title?: ReactNode;
  backLink?: ComponentProps<typeof Link>['href'];
  left?: ReactNode;
  right?: ReactNode;
};

const DefaultItemHeader = ({
  backLink,
  title,
  left,
  right,
}: DefaultItemHeaderProps) => {
  return (
    <header className="bg-base-300 relative flex items-center justify-between p-3 px-2">
      {left}
      {!left && backLink && (
        <Link href={backLink} className="p-1">
          <ArrowLeft size={20} />
        </Link>
      )}
      {title && (
        <h1 className="absolute inset-y-0 left-1/2 m-auto flex -translate-x-1/2 items-center font-bold">
          {title}
        </h1>
      )}
      {right}
    </header>
  );
};

export default DefaultItemHeader;
