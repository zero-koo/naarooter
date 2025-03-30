import React from 'react';

export type CommunityFormLayoutProps = {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
};

const CommunityFormLayout = ({
  header,
  body,
  footer,
}: CommunityFormLayoutProps) => {
  return (
    <div>
      <header className="px-2 py-1 text-2xl font-bold">{header}</header>
      <div className="px-2 py-3">{body}</div>
      <footer className="flex justify-end gap-2 px-2 py-1">{footer}</footer>
    </div>
  );
};

export default CommunityFormLayout;
