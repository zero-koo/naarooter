'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CommunityBannerImage from '@/public/community_banner_1.png';
import { api, RouterOutputs } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { PlusIcon } from 'lucide-react';

import { Button } from '../Button';
import CommunityBannerEditDialog from './CommunityBannerEditDialog';
import CommunityIcon from './CommunityIcon';
import CommunityIconEditDialog from './CommunityIconEditDialog';

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
        queryClient.invalidateQueries({
          queryKey: getQueryKey(api.community.myList),
        });
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
        queryClient.invalidateQueries({
          queryKey: getQueryKey(api.community.myList),
        });
      },
    });

  const [isCommunityIconEditDialogOpen, setCommunityIconEditDialogOpen] =
    useState(false);

  const [isCommunityBannerEditDialogOpen, setCommunityIconBannerDialogOpen] =
    useState(false);

  return (
    <div>
      <div className="relative">
        <Image
          src={community.bannerUrl ?? CommunityBannerImage}
          alt="banner"
          width={1400}
          height={200}
          className="mb-1 aspect-[7/1] object-cover md:rounded-lg"
        />
        {community.isOwner && (
          <CommunityBannerEditDialog
            isOpen={isCommunityBannerEditDialogOpen}
            setOpen={setCommunityIconBannerDialogOpen}
            communityId={communityId}
            className="absolute bottom-2 right-2"
          />
        )}
      </div>
      <div className="flex items-center p-2 md:pr-0">
        <div className="flex items-center gap-0.5">
          <div className="group relative flex size-8 overflow-hidden rounded-full border-base-300 bg-white">
            <CommunityIcon iconUrl={community.iconUrl} />
            {community.isOwner && (
              <CommunityIconEditDialog
                communityId={communityId}
                isOpen={isCommunityIconEditDialogOpen}
                setOpen={setCommunityIconEditDialogOpen}
              />
            )}
          </div>
          <h1 className="px-2 text-2xl font-bold">{community.name}</h1>
        </div>
        <div className={'ml-auto flex gap-2'}>
          <Link href={`/community/${communityId}/create`}>
            <Button outline LeftIcon={PlusIcon}>
              글쓰기
            </Button>
          </Link>
          {community &&
            !community.isOwner &&
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
