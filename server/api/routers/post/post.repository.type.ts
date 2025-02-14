import { MBTI, Reaction } from '@/types/shared';
import { Prisma } from '@prisma/client';

import { User } from '../user/user.repository.type';
import { UserID } from '../user/user.type';

export const getDefaultPostSelect = (userId?: UserID | null) =>
  Prisma.validator<Prisma.PostSelect>()({
    id: true,
    title: true,
    description: true,
    type: true,
    communityId: true,
    author: {
      select: {
        id: true,
        name: true,
        mbti: true,
      },
    },
    images: true,
    _count: {
      select: {
        comment: true,
        postLike: true,
        postDislike: true,
      },
    },
    postLike: {
      where: {
        authorId: userId ?? undefined,
      },
    },
    postDislike: {
      where: {
        authorId: userId ?? undefined,
      },
    },
    createdAt: true,
    updatedAt: true,
    viewCount: true,
  });

export type PostPrismaPayload = Prisma.PostGetPayload<{
  select: ReturnType<typeof getDefaultPostSelect>;
}>;

export type PostRepositoryPayload = {
  id: string;
  title: string;
  communityId: string;
  author: {
    id: string;
    name: string | null;
    mbti: MBTI | null;
    isMe: boolean;
  };
  description: string;
  type: PostType;
  images: string[];
  commentCount: number;
  reaction: Reaction;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PostType = 'POST' | 'POLL';

export type PostCreateParams = Pick<
  PostRepositoryPayload,
  'title' | 'communityId' | 'description' | 'images'
> & {
  authorId: User['id'];
};

export type PostUpdateParams = Pick<
  PostRepositoryPayload,
  'title' | 'description' | 'images'
> & {
  postId: PostRepositoryPayload['id'];
  userId: UserID;
};

export type PostListParams = {
  userId: UserID | null;
  communityId?: string;
  authorId?: string;
  search?: string;
  limit?: number;
  lastId?: PostRepositoryPayload['id'];
  sortOrder?: 'asc' | 'desc';
};
