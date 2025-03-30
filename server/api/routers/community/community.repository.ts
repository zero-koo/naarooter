import { prisma } from '@/server/prisma';
import { PrismaClient } from '@prisma/client';

import { UserID } from '../user/user.type';
import {
  CommunityPrismaPayload,
  CommunityRepositoryCreateParams,
  CommunityRepositoryJoinParams,
  CommunityRepositoryListParams,
  CommunityRepositoryPayload,
  CommunityRepositoryUpdateParams,
  CommunityRepositoryWithdrawParams,
  getDefaultCommunitySelect,
} from './community.repository.type';
import { CommunityID } from './communty.type';

export interface ICommunityRepository {
  list(
    params: CommunityRepositoryListParams
  ): Promise<CommunityRepositoryPayload[]>;
  byId({
    id,
  }: {
    id: CommunityRepositoryPayload['id'];
  }): Promise<CommunityRepositoryPayload | null>;
  byName({
    name,
  }: {
    name: string;
  }): Promise<CommunityRepositoryPayload | null>;
  create(
    params: CommunityRepositoryCreateParams
  ): Promise<CommunityRepositoryPayload>;
  update(
    params: CommunityRepositoryUpdateParams
  ): Promise<CommunityRepositoryPayload>;
  delete(id: CommunityRepositoryPayload['id']): Promise<void>;
  join(params: CommunityRepositoryJoinParams): Promise<void>;
  withdraw(params: CommunityRepositoryWithdrawParams): Promise<void>;
  hasUser(params: {
    communityId: CommunityID;
    userId: UserID;
  }): Promise<boolean>;
  topics(): Promise<{ topics: Array<{ id: string; name: string }> }>;
}

export class CommunityRepository implements ICommunityRepository {
  constructor(private db: PrismaClient) {}
  static payloadToCommunity({
    id,
    name,
    description,
    ownerId,
    _count: { users: numUsers },
    topics,
  }: CommunityPrismaPayload): CommunityRepositoryPayload {
    return {
      id,
      name,
      numUsers,
      description: description ?? '',
      ownerId,
      topics,
    };
  }
  async list({
    topicId,
    userId,
    limit = 50,
    lastId,
  }: CommunityRepositoryListParams): Promise<CommunityRepositoryPayload[]> {
    const communityPayload = await this.db.community.findMany({
      select: getDefaultCommunitySelect(),
      take: limit + 1,
      where: {
        topics: {
          some: {
            id: topicId,
          },
        },
        users: {
          some: {
            userId,
          },
        },
      },
      cursor: lastId
        ? {
            id: lastId,
          }
        : undefined,
    });

    return communityPayload.map((payload) =>
      CommunityRepository.payloadToCommunity(payload)
    );
  }
  async byId({
    id,
  }: {
    id: CommunityRepositoryPayload['id'];
  }): Promise<CommunityRepositoryPayload | null> {
    const communityPayload = await this.db.community.findUnique({
      select: getDefaultCommunitySelect(),
      where: {
        id,
      },
    });
    if (!communityPayload) return null;
    return CommunityRepository.payloadToCommunity(communityPayload);
  }
  async byName({
    name,
  }: {
    name: string;
  }): Promise<CommunityRepositoryPayload | null> {
    const communityPayload = await this.db.community.findUnique({
      select: getDefaultCommunitySelect(),
      where: {
        name,
      },
    });
    if (!communityPayload) return null;
    return CommunityRepository.payloadToCommunity(communityPayload);
  }
  async create({
    userId,
    topicIds,
    name,
    description,
  }: CommunityRepositoryCreateParams): Promise<CommunityRepositoryPayload> {
    const communityPayload = await this.db.community.create({
      select: getDefaultCommunitySelect(),
      data: {
        ownerId: userId,
        topics: {
          connect: topicIds.map((id) => ({
            id,
          })),
        },
        name,
        description,
      },
    });
    return CommunityRepository.payloadToCommunity(communityPayload);
  }
  async update({
    id,
    topicIds,
    name,
    description,
  }: CommunityRepositoryUpdateParams): Promise<CommunityRepositoryPayload> {
    const communityPayload = await this.db.community.update({
      select: getDefaultCommunitySelect(),
      where: {
        id,
      },
      data: {
        topics: {
          connect: (topicIds ?? []).map((id) => ({
            id,
          })),
        },
        name,
        description,
      },
    });
    return CommunityRepository.payloadToCommunity(communityPayload);
  }
  async delete(id: CommunityRepositoryPayload['id']): Promise<void> {
    await this.db.community.delete({
      where: {
        id,
      },
    });
  }
  async join({
    communityId,
    userId,
  }: CommunityRepositoryJoinParams): Promise<void> {
    await this.db.userCommunity.create({
      data: {
        user: { connect: { id: userId } },
        community: { connect: { id: communityId } },
      },
    });
  }
  async withdraw({
    communityId,
    userId,
  }: CommunityRepositoryWithdrawParams): Promise<void> {
    await this.db.userCommunity.delete({
      where: {
        userId_communityId: {
          userId,
          communityId,
        },
      },
    });
  }
  async hasUser({
    communityId,
    userId,
  }: {
    communityId: CommunityID;
    userId: UserID;
  }): Promise<boolean> {
    const userCommunity = await this.db.userCommunity.findUnique({
      where: {
        userId_communityId: {
          userId,
          communityId,
        },
      },
    });

    return !!userCommunity;
  }
  async topics(): Promise<{ topics: Array<{ id: string; name: string }> }> {
    const topics = await this.db.communityTopic.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return { topics };
  }
}

export const communityRepository = new CommunityRepository(prisma);
