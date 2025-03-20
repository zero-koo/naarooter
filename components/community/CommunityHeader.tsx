'use client';

import Link from 'next/link';
import { api, RouterOutputs } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { PlusIcon } from 'lucide-react';

import { Button } from '../Button';
import CommunityHeaderView from './CommunityHeaderView';

type CommunityHeaderProps = {
  communityId: string;
};

const CommunityHeader = ({ communityId }: CommunityHeaderProps) => {
  const [community] = api.community.byId.useSuspenseQuery({ id: communityId });

  const queryClient = useQueryClient();
  const { mutate: joinCommunity, isPending: isJoiningCommunity } =
    api.community.join.useMutation({
      onSuccess() {
        if (!community) return;
        queryClient.setQueryData<RouterOutputs['community']['byId']>(
          getQueryKey(api.community.byId, { id: communityId }, 'query'),
          { ...community, isJoined: true }
        );
      },
    });
  const { mutate: withdrawCommunity, isPending: isWithdrawingCommunity } =
    api.community.withdraw.useMutation({
      onSuccess() {
        if (!community) return;
        queryClient.setQueryData<RouterOutputs['community']['byId']>(
          getQueryKey(api.community.byId, { id: communityId }, 'query'),
          { ...community, isJoined: false }
        );
      },
    });

  return (
    <CommunityHeaderView
      title={community.name}
      right={
        <div className={'flex gap-2'}>
          <Link href={`/community/${communityId}/create`}>
            <Button outline LeftIcon={PlusIcon}>
              글쓰기
            </Button>
          </Link>
          {community &&
            (!community.isJoined ? (
              <Button
                outline
                loading={isJoiningCommunity}
                onClick={() =>
                  joinCommunity({
                    communityId,
                  })
                }
              >
                가입하기
              </Button>
            ) : (
              <Button
                outline
                loading={isWithdrawingCommunity}
                onClick={() =>
                  withdrawCommunity({
                    communityId,
                  })
                }
              >
                탈퇴하기
              </Button>
            ))}
        </div>
      }
    />
  );
};

export default CommunityHeader;
