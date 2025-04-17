import React from 'react';
import Link from 'next/link';

type CommunityLabelProps = {
  label: string;
  href?: string;
  size?: 'sm' | 'md';
};

const CommunityLabel = ({ label, href }: CommunityLabelProps) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    href ? <Link href={href}>{children}</Link> : <>{children}</>;

  return (
    <Wrapper>
      <div className="px-2 font-semibold hover:underline">{label}</div>
    </Wrapper>
  );
};

export default CommunityLabel;
