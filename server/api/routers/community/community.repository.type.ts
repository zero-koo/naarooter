import { Prisma } from '@prisma/client';

import { UserID } from '../user/user.type';

export const getDefaultCommunitySelect = () =>
  Prisma.validator<Prisma.CommunitySelect>()({
    id: true,
    name: true,
    description: true,
    iconUrl: true,
    bannerUrl: true,
    _count: {
      select: {
        users: true,
      },
    },
    topics: {
      select: {
        id: true,
        name: true,
      },
    },
    ownerId: true,
  });

export type CommunityPrismaPayload = Prisma.CommunityGetPayload<{
  select: ReturnType<typeof getDefaultCommunitySelect>;
}>;

export type CommunityRepositoryPayload = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  numUsers: number;
  topics: Array<{ id: string; name: string }>;
  iconUrl?: string | null;
  bannerUrl?: string | null;
};

type CommunityID = CommunityRepositoryPayload['id'];

export type CommunityRepositoryListParams = {
  topicId?: string;
  limit?: number;
  userId?: UserID;
  lastId?: CommunityID;
};

export type CommunityRepositoryCreateParams = Pick<
  CommunityRepositoryPayload,
  'name' | 'description' | 'iconUrl' | 'bannerUrl'
> & {
  userId: UserID;
  topicIds: string[];
};

export type CommunityRepositoryUpdateParams = Pick<
  CommunityRepositoryPayload,
  'id'
> &
  Partial<CommunityRepositoryCreateParams>;

export type CommunityRepositoryJoinParams = {
  communityId: CommunityID;
  userId: UserID;
};

export type CommunityRepositoryWithdrawParams = {
  communityId: CommunityID;
  userId: UserID;
};
