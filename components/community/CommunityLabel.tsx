import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

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
          'flex w-fit items-center rounded-lg bg-base-content/20 py-0.5 px-2 text-sm font-semibold',
          {
            'text-md px-3 py-1 rounded-xl': size === 'md',
          }
        )}
      >
        {label}
      </Tag>
    </Wrapper>
  );
};

export default CommunityLabel;
