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

export class PostRepository implements IPostRepository {
  constructor(private db: PrismaClient) {}

  public static payloadToPost(
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
      likeCount: _count.postLike,
      dislikeCount: _count.postDislike,
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
    const postPayload = await this.db.post.findMany({
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

    return postPayload.map(PostRepository.payloadToPost);
  }

  public async byId(
    id: PostRepositoryPayload['id']
  ): Promise<PostRepositoryPayload | null> {
    const postPayload = await this.db.post.findUnique({
      select: defaultPostSelect,
      where: {
        id,
      },
    });
    return postPayload && PostRepository.payloadToPost(postPayload);
  }

  async create({
    authorId,
    communityId,
    title,
    description,
    images,
  }: PostCreateParams): Promise<PostRepositoryPayload> {
    const postPayload = await this.db.post.create({
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
    return PostRepository.payloadToPost(postPayload);
  }

  async update({
    postId,
    title,
    description,
    images,
  }: PostUpdateParams): Promise<PostRepositoryPayload> {
    const postPayload = await this.db.post.update({
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
    return PostRepository.payloadToPost(postPayload);
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
