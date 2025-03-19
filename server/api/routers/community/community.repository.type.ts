import { Prisma } from '@prisma/client';

import { UserID } from '../user/user.type';

export const getDefaultCommunitySelect = () =>
  Prisma.validator<Prisma.CommunitySelect>()({
    id: true,
    name: true,
    description: true,
    topicId: true,
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
  topicId: number;
};

type CommunityID = CommunityRepositoryPayload['id'];

export type CommunityRepositoryListParams = {
  topicId?: number;
  limit?: number;
  userId?: UserID;
  lastId?: CommunityID;
};

export type CommunityRepositoryCreateParams = Pick<
  CommunityRepositoryPayload,
  'name' | 'description' | 'ownerId' | 'topicId'
>;

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
