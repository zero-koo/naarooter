'use client';

import { usePathname } from 'next/navigation';
import { RotateCcw } from 'lucide-react';

import { usePollQuery } from '@/hooks/queries/usePollQuery';

import DefaultItemHeader from '../DefaultItemHeader';

const PollPageHeader = ({ postId }: { postId: string }) => {
  const pathName = usePathname();
  const [, { refetch }] = usePollQuery(postId);

  return (
    <DefaultItemHeader
      backLink={`${pathName.replace(`/poll/${postId}`, '') || '/'}`}
      right={
        <button className="ml-auto p-1 opacity-50" onClick={() => refetch()}>
          <RotateCcw size={18} />
        </button>
      }
    />
  );
};

export default PollPageHeader;
