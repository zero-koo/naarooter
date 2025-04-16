import React from 'react';

const CommunityHeaderTemplate = ({
  title,
  banner,
  icon,
  right,
}: {
  title: React.ReactNode;
  banner: React.ReactNode;
  icon: React.ReactNode;
  right?: React.ReactNode;
}) => {
  return (
    <div>
      <div className="relative">{banner}</div>
      <div className="flex items-center p-2 md:pr-0">
        <div className="flex items-center gap-0.5">
          <div className="border-base-300 group relative flex size-8 overflow-hidden rounded-full bg-white">
            {icon}
          </div>
          <h1 className="px-2 text-2xl font-bold">{title}</h1>
        </div>
        {right && <div className={'ml-auto flex gap-2'}>{right}</div>}
      </div>
    </div>
  );
};

export default CommunityHeaderTemplate;
