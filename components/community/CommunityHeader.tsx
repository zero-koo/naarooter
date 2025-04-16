'use client';

import { useState } from 'react';
import Link from 'next/link';
import CommunityBannerImage from '@/public/community_banner_1.png';
import { api, RouterOutputs } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';

import CommunityBanner from './CommunityBanner';
import CommunityBannerEditDialog from './CommunityBannerEditDialog';
import CommunityHeaderTemplate from './CommunityHeaderTemplate';
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
    <CommunityHeaderTemplate
      title={community.name}
      banner={
        <>
          <CommunityBanner
            bannerSrc={community.bannerUrl ?? CommunityBannerImage}
          />
          {community.isOwner && (
            <CommunityBannerEditDialog
              isOpen={isCommunityBannerEditDialogOpen}
              setOpen={setCommunityIconBannerDialogOpen}
              communityId={communityId}
              className="absolute bottom-2 right-2"
            />
          )}
        </>
      }
      icon={
        <>
          <CommunityIcon iconUrl={community.iconUrl} />
          {community.isOwner && (
            <CommunityIconEditDialog
              communityId={communityId}
              isOpen={isCommunityIconEditDialogOpen}
              setOpen={setCommunityIconEditDialogOpen}
            />
          )}
        </>
      }
      right={
        <>
          <Link href={`/community/${communityId}/create`}>
            <Button variant={'outline'} LeftIcon={PlusIcon}>
              글쓰기
            </Button>
          </Link>
          {community &&
            !community.isOwner &&
            (!community.isJoined ? (
              <Button
                variant={'outline'}
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
                variant={'outline'}
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
        </>
      }
    />
  );
};

export default CommunityHeader;
