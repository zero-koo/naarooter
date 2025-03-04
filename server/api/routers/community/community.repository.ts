import { prisma } from '@/server/prisma';
import { PrismaClient } from '@prisma/client';

import {
  CommunityPrismaPayload,
  CommunityRepositoryCreateParams,
  CommunityRepositoryJoinParams,
  CommunityRepositoryListParams,
  CommunityRepositoryPayload,
  CommunityRepositoryUpdateParams,
  getDefaultCommunitySelect,
} from './community.repository.type';

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
}

export class CommunityRepository implements ICommunityRepository {
  constructor(private db: PrismaClient) {}
  static payloadToCommunity({
    id,
    name,
    description,
    ownerId,
    topicId,
  }: CommunityPrismaPayload): CommunityRepositoryPayload {
    return {
      id,
      name,
      description: description ?? '',
      ownerId,
      topicId,
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
        topicId,
        users: {
          some: {
            id: userId,
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
    ownerId,
    topicId,
    name,
    description,
  }: CommunityRepositoryCreateParams): Promise<CommunityRepositoryPayload> {
    const communityPayload = await this.db.community.create({
      select: getDefaultCommunitySelect(),
      data: {
        ownerId,
        topicId,
        name,
        description,
      },
    });
    return CommunityRepository.payloadToCommunity(communityPayload);
  }
  async update({
    id,
    ownerId,
    topicId,
    name,
    description,
  }: CommunityRepositoryUpdateParams): Promise<CommunityRepositoryPayload> {
    const communityPayload = await this.db.community.update({
      select: getDefaultCommunitySelect(),
      where: {
        id,
      },
      data: {
        ownerId,
        topicId,
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
    await this.db.community.update({
      where: { id: communityId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
  }
}

export const communityRepository = new CommunityRepository(prisma);
