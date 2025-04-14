import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type CommunityLabelProps = {
  label: string;
  href?: string;
  size?: 'sm' | 'md';
};

const CommunityLabel = ({ label, href, size = 'sm' }: CommunityLabelProps) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    href ? <Link href={href}>{children}</Link> : <>{children}</>;

  const Tag = href ? 'button' : 'div';

  return (
    <Wrapper>
      <Tag
        className={cn(
          'bg-foreground/20 flex w-fit items-center rounded-lg px-2 py-0.5 text-sm font-semibold',
          {
            'text-md rounded-xl px-3 py-1': size === 'md',
          }
        )}
      >
        {label}
      </Tag>
    </Wrapper>
  );
};

export default CommunityLabel;
