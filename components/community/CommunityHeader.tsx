'use client';

import { api } from '@/trpc/react';
import { PlusIcon } from 'lucide-react';

import { Button } from '../Button';
import CommunityLabel from './CommunityLabel';

type CommunityHeaderProps = {
  communityId?: string;
  title: string;
  href?: string;
};

const CommunityHeader = ({
  communityId,
  title,
  href,
}: CommunityHeaderProps) => {
  const { mutate: joinCommunity, isPending: isJoiningCommunity } =
    api.community.join.useMutation({});
  return (
    <div className="flex items-center p-2">
      <CommunityLabel label={title} href={href} size="md" />
      {communityId && (
        <Button
          outline
          className="ml-auto"
          LeftIcon={PlusIcon}
          loading={isJoiningCommunity}
          onClick={() =>
            joinCommunity({
              communityId,
            })
          }
        >
          가입하기
        </Button>
      )}
    </div>
  );
};

export default CommunityHeader;
