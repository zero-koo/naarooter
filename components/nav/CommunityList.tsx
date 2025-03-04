'use client';

import { PlusIcon } from 'lucide-react';

import { useMyCommunityListQuery } from '@/hooks/queries/useMyCommunityListQuery';

import { Button } from '../Button';

const CommunityList = () => {
  const [data] = useMyCommunityListQuery();

  return (
    <>
      {data.communities.length ? (
        data.communities.map((community) => (
          <div key={community.id}>{community.name}</div>
        ))
      ) : (
        <div className="px-3 py-2">
          <div className="mb-1 text-xs opacity-70">
            가입한 커뮤니티가 없습니다
          </div>
          <Button
            outline
            size="xs"
            className="flex h-auto w-full flex-col items-center justify-center gap-2 py-4"
            // className="rounded-lg border border-neutral-content/50 p-3 text-sm"
          >
            <PlusIcon strokeWidth={1.5} />
            <span>커뮤니티 추가</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default CommunityList;
