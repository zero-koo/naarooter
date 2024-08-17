import { Reaction } from '@/types/shared';
import { Prisma } from '@prisma/client';

import { Post } from '../post/post.type';
import { User } from '../user/user.repository.type';

export const defaultCommentSelector = (userId?: User['id'] | null) =>
  Prisma.validator<Prisma.CommentSelect>()({
    id: true,
    author: {
      select: {
        id: true,
        mbti: true,
        name: true,
      },
    },
    content: true,
    parentCommentId: true,
    childComments: {
      select: {
        id: true,
        author: {
          select: {
            id: true,
            mbti: true,
            name: true,
          },
        },
        content: true,
        parentCommentId: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            commentLike: true,
            commentDislike: true,
            childComments: true,
          },
        },
        commentLike: {
          where: {
            authorId: userId ?? undefined,
          },
        },
        commentDislike: {
          where: {
            authorId: userId ?? undefined,
          },
        },
        status: true,
        targetUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 5,
    },
    createdAt: true,
    updatedAt: true,
    _count: {
      select: {
        commentLike: true,
        commentDislike: true,
        childComments: true,
      },
    },
    commentLike: {
      where: {
        authorId: userId ?? undefined,
      },
    },
    commentDislike: {
      where: {
        authorId: userId ?? undefined,
      },
    },
    status: true,
    targetUser: {
      select: {
        id: true,
        name: true,
      },
    },
  });

export type CommentPrismaPayload = Prisma.CommentGetPayload<{
  select: ReturnType<typeof defaultCommentSelector>;
}>;

export type CommentRepositoryPayload = {
  id: CommentPrismaPayload['id'];
  author: CommentPrismaPayload['author'] & {
    isMe: boolean;
  };
  content: CommentPrismaPayload['content'];
  childCommentCount: number;
  childComments: CommentRepositoryPayload[];
  parentCommentId: CommentPrismaPayload['id'] | null;
  reaction: Reaction;
  targetUser: CommentPrismaPayload['targetUser'];
  status: CommentPrismaPayload['status'];
  createdAt: CommentPrismaPayload['createdAt'];
  updatedAt: CommentPrismaPayload['updatedAt'];
};

export type CommentCreateParams = {
  authorId: User['id'];
  postId: Post['id'];
  content: CommentPrismaPayload['content'];
  parentCommentId?: CommentPrismaPayload['id'];
  targetUserId?: User['id'];
};

export type CommentUpdateParams = {
  commentId: CommentPrismaPayload['id'];
  authorId?: User['id'];
  content?: CommentPrismaPayload['content'];
  status?: CommentPrismaPayload['status'];
};
