'use client';

import Image from 'next/image';
import Link from 'next/link';
import CommunityBannerImage from '@/public/community_banner_1.png';
import { api, RouterOutputs } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { PlusIcon } from 'lucide-react';

import { Button } from '../Button';
import CommunityLabel from './CommunityLabel';

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
    <div>
      <Image
        src={CommunityBannerImage}
        alt="banner"
        className="mb-2 aspect-[7/1] object-cover md:rounded-lg"
      />
      <div className="flex items-center p-2 md:px-0">
        <h1 className="px-2 text-2xl font-bold">{community.name}</h1>
        <div className={'ml-auto flex gap-2'}>
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
      </div>
    </div>
  );
};

export default CommunityHeader;
