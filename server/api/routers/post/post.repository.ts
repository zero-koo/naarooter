import { prisma } from '@/server/prisma';
import { PrismaClient } from '@prisma/client';

import { UserID } from '../user/user.type';
import {
  getDefaultPostSelect,
  PostCreateParams,
  PostListParams,
  PostPrismaPayload,
  PostRepositoryPayload,
  PostUpdateParams,
} from './post.repository.type';

export interface IPostRepository {
  list(params: PostListParams): Promise<PostRepositoryPayload[]>;
  byId({
    id,
    userId,
  }: {
    id: PostRepositoryPayload['id'];
    userId?: UserID | null;
  }): Promise<PostRepositoryPayload | null>;
  create(params: PostCreateParams): Promise<PostRepositoryPayload>;
  update(params: PostUpdateParams): Promise<PostRepositoryPayload>;
  delete(id: PostRepositoryPayload['id']): Promise<void>;
}

export class PostRepository implements IPostRepository {
  constructor(private db: PrismaClient) {}

  public static payloadToPost(
    postPayload: PostPrismaPayload,
    userId: UserID | null
  ): PostRepositoryPayload {
    const {
      id,
      author,
      title,
      description,
      communityId: communityId,
      createdAt,
      images,
      type,
      _count,
      postLike,
      postDislike,
      updatedAt,
      viewCount,
    } = postPayload;
    return {
      id,
      author: {
        ...author,
        isMe: author.id === userId,
      },
      title,
      communityId,
      type,
      description,
      images,
      commentCount: _count.comment,
      reaction: {
        likeCount: _count.postLike,
        dislikeCount: _count.postDislike,
        selectedReaction: postLike.length
          ? 'like'
          : postDislike.length
            ? 'dislike'
            : null,
      },
      viewCount,
      createdAt,
      updatedAt,
    };
  }

  public async list({
    userId,
    authorId,
    communityId,
    search,
    lastId,
    limit = 20,
    sortOrder = 'desc',
  }: PostListParams) {
    const postPayload = await this.db.post.findMany({
      select: getDefaultPostSelect(userId),
      take: limit + 1,
      where: {
        communityId: communityId,
        authorId,
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

    return postPayload.map((payload) =>
      PostRepository.payloadToPost(payload, userId)
    );
  }

  public async byId({
    id,
    userId,
  }: {
    id: PostRepositoryPayload['id'];
    userId: UserID | null;
  }): Promise<PostRepositoryPayload | null> {
    const postPayload = await this.db.post.findUnique({
      select: getDefaultPostSelect(userId),
      where: {
        id,
      },
    });
    return postPayload && PostRepository.payloadToPost(postPayload, userId);
  }

  async create({
    authorId,
    communityId,
    title,
    description,
    images,
  }: PostCreateParams): Promise<PostRepositoryPayload> {
    const postPayload = await this.db.post.create({
      select: getDefaultPostSelect(authorId),
      data: {
        authorId: authorId,
        communityId: communityId ?? undefined,
        title,
        description,
        type: 'POST',
        images,
      },
    });
    return PostRepository.payloadToPost(postPayload, authorId);
  }

  async update({
    userId,
    postId,
    title,
    description,
    images,
  }: PostUpdateParams): Promise<PostRepositoryPayload> {
    const postPayload = await this.db.post.update({
      select: getDefaultPostSelect(userId),
      where: {
        id: postId,
      },
      data: {
        title,
        description,
        images,
      },
    });
    return PostRepository.payloadToPost(postPayload, userId);
  }

  async delete(id: PostRepositoryPayload['id']): Promise<void> {
    await this.db.post.delete({
      where: {
        id,
      },
    });
    return;
  }
}

export const postRepository = new PostRepository(prisma);
