'use client';

import { SearchIcon } from 'lucide-react';

import { useMyCommunityListQuery } from '@/hooks/queries/useMyCommunityListQuery';

import CommunityIcon from '../community/CommunityIcon';
import { NavMenu } from './NavMenu';

const CommunityList = () => {
  const [data] = useMyCommunityListQuery();

  return (
    <>
      {data?.communities.length ? (
        data.communities.map((community) => (
          <NavMenu
            link={`/community/${community.id}`}
            key={community.id}
            icon={<CommunityIcon iconUrl={community.iconUrl} size="xs" />}
          >
            {community.name}
          </NavMenu>
        ))
      ) : (
        <div className="px-3 py-2">
          <div className="mb-1 text-xs opacity-70">
            가입한 커뮤니티가 없습니다
          </div>
          <button className="flex h-auto w-full flex-col items-center justify-center gap-2 rounded-sm border border-primary-content/30 py-4 text-xs text-primary-content/50 hover:border-primary-content/70 hover:text-primary-content/70">
            <SearchIcon strokeWidth={1.5} size={20} />
            <span>커뮤니티 검색</span>
          </button>
        </div>
      )}
    </>
  );
};

export default CommunityList;
