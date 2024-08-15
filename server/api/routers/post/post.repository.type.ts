import { MBTI } from '@/types/shared';
import { Prisma } from '@prisma/client';

import { User } from '../user/user.repository.type';

export const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  description: true,
  type: true,
  groupId: true,
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
      postReaction: {
        where: {
          reactionType: 'like',
        },
      },
    },
  },
  postReaction: {
    select: {
      authorId: true,
      reactionType: true,
    },
  },
  createdAt: true,
  updatedAt: true,
  viewCount: true,
});

export type PostPrismaPayload = Prisma.PostGetPayload<{
  select: typeof defaultPostSelect;
}>;

export type PostRepositoryPayload = {
  id: string;
  title: string;
  communityId: string | null;
  author: {
    id: string;
    name: string | null;
    mbti: MBTI | null;
  };
  description: string;
  type: PostType;
  images: string[];
  commentCount: number;
  likeCount: number;
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
};

export type PostListParams = {
  communityId?: string;
  authorId?: string;
  search?: string;
  limit?: number;
  lastId?: PostRepositoryPayload['id'];
  sortOrder?: 'asc' | 'desc';
};
