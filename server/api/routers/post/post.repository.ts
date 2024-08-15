import { prisma } from '@/server/prisma';
import { PrismaClient } from '@prisma/client';

import {
  defaultPostSelect,
  PostCreateParams,
  PostListParams,
  PostPrismaPayload,
  PostRepositoryPayload,
  PostUpdateParams,
} from './post.repository.type';

export interface IPostRepository {
  list(params: PostListParams): Promise<PostRepositoryPayload[]>;
  byId(id: PostRepositoryPayload['id']): Promise<PostRepositoryPayload | null>;
  create(params: PostCreateParams): Promise<PostRepositoryPayload>;
  update(params: PostUpdateParams): Promise<PostRepositoryPayload>;
  delete(id: PostRepositoryPayload['id']): Promise<void>;
}

class PostRepository implements IPostRepository {
  constructor(private _db: PrismaClient) {}

  private _payloadToPost(
    postPayload: PostPrismaPayload
  ): PostRepositoryPayload {
    const {
      id,
      author,
      title,
      description,
      groupId: communityId,
      createdAt,
      images,
      type,
      _count,
      updatedAt,
      viewCount,
    } = postPayload;
    return {
      id,
      author,
      title,
      communityId,
      type,
      description,
      images,
      commentCount: _count.comment,
      likeCount: _count.postReaction,
      viewCount,
      createdAt,
      updatedAt,
    };
  }

  public async list({
    communityId,
    search,
    lastId,
    limit = 20,
    sortOrder = 'desc',
  }: PostListParams) {
    const postPayload = await this._db.post.findMany({
      select: defaultPostSelect,
      take: limit + 1,
      where: {
        groupId: communityId,
        AND: search?.split(' ').map((keyword) => ({
          title: {
            contains: keyword,
            mode: 'insensitive',
          },
        })),
      },
      cursor: lastId
        ? {
            id: lastId,
          }
        : undefined,
      orderBy: {
        createdAt: sortOrder,
      },
    });

    return postPayload.map(this._payloadToPost);
  }

  public async byId(
    id: PostRepositoryPayload['id']
  ): Promise<PostRepositoryPayload | null> {
    const postPayload = await this._db.post.findUnique({
      select: defaultPostSelect,
      where: {
        id,
      },
    });
    return postPayload && this._payloadToPost(postPayload);
  }

  async create({
    authorId,
    communityId,
    title,
    description,
    images,
  }: PostCreateParams): Promise<PostRepositoryPayload> {
    const postPayload = await this._db.post.create({
      select: defaultPostSelect,
      data: {
        authorId: authorId,
        groupId: communityId,
        title,
        description,
        type: 'POST',
        images,
      },
    });
    return this._payloadToPost(postPayload);
  }

  async update({
    postId,
    title,
    description,
    images,
  }: PostUpdateParams): Promise<PostRepositoryPayload> {
    const postPayload = await this._db.post.update({
      select: defaultPostSelect,
      where: {
        id: postId,
      },
      data: {
        title,
        description,
        images,
      },
    });
    return this._payloadToPost(postPayload);
  }

  async delete(id: PostRepositoryPayload['id']): Promise<void> {
    await this._db.post.delete({
      where: {
        id,
      },
    });
    return;
  }
}

export const postRepository = new PostRepository(prisma);
