import { ReactNode } from 'react';

type DefaultListHeaderProps = {
  title: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
};

const DefaultListHeader = ({ title, left, right }: DefaultListHeaderProps) => {
  return (
    <div className="border-foreground/30 relative flex h-12 items-center justify-between border-b">
      {left}
      <h1 className="absolute left-1/2 flex -translate-x-1/2 items-center text-lg font-semibold">
        {title}
      </h1>
      {right}
    </div>
  );
};

export default DefaultListHeader;
