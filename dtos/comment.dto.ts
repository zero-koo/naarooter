import { countReactions } from '@/lib/utils';
import { TComment } from '@/types/shared';
import { Prisma } from '@prisma/client';

export const defaultCommentSelector = Prisma.validator<Prisma.CommentSelect>()({
  id: true,
  author: {
    select: {
      id: true,
      mbti: true,
      name: true,
    },
  },
  content: true,
  commentReaction: {
    select: {
      authorId: true,
      reactionType: true,
    },
  },
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
      commentReaction: {
        select: {
          authorId: true,
          reactionType: true,
        },
      },
      parentCommentId: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          childComments: true,
        },
      },
      status: true,
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
      childComments: true,
    },
  },
  status: true,
});

export function createCommentDto({
  comment,
  userId,
}: {
  comment: Prisma.CommentGetPayload<{ select: typeof defaultCommentSelector }>;
  userId: string | null;
}): TComment {
  return {
    id: comment.id,
    content: comment.content,
    authorId: comment.author.id,
    authorName: comment.author.name,
    authorMBTI: comment.author.mbti,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    parentCommentId: comment.parentCommentId ?? undefined,
    comments: comment.childComments.map((comment) =>
      createCommentDto({ comment: { ...comment, childComments: [] }, userId })
    ),
    commentsCount: comment._count.childComments,
    ...countReactions(comment.commentReaction, userId),
    status: comment.status,
  };
}
