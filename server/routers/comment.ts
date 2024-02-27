import { prisma } from '@/server/prisma';
import { z } from 'zod';

import { privateProcedure, publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { createCommentDto, defaultCommentSelector } from '@/dtos/comment.dto';

export const commentRouter = router({
  list: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        parentCommentId: z.number().optional(),
        initialCursor: z.number().nullish(),
        limit: z.number().min(1).max(100).default(5),
        direction: z.enum(['asc', 'desc']).default('desc'),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const cursor = input.cursor ?? input.initialCursor;

      const [comments, count] = await prisma.$transaction([
        prisma.comment.findMany({
          select: defaultCommentSelector,
          take: input.limit + (cursor ? 2 : 1),
          where: {
            postId: input.postId,
            parentCommentId: input.parentCommentId ?? null,
          },
          cursor: cursor
            ? {
                id: cursor,
              }
            : undefined,
          orderBy: {
            createdAt: input.direction,
          },
        }),
        prisma.comment.count({ where: { postId: input.postId } }),
      ]);

      if (cursor) comments.shift();

      let hasNextPage = false;
      if (comments.length > input.limit) {
        comments.pop();
        hasNextPage = true;
      }

      return {
        comments: comments.map((comment) =>
          createCommentDto({ comment, userId: ctx.auth.userId })
        ),
        hasNextPage,
        totalCount: count,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const comment = await prisma.comment.findUnique({
        where: {
          id: input.id,
        },
        select: defaultCommentSelector,
      });

      if (!comment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No comment with id '${input.id}'`,
        });
      }

      return createCommentDto({ comment, userId: ctx.auth.userId });
    }),
  add: privateProcedure
    .input(
      z.object({
        postId: z.string().uuid().optional(),
        content: z.string(),
        parentId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const comment = await prisma.comment.create({
        data: {
          postId: input.postId ?? null,
          parentCommentId: input.parentId,
          authorId: ctx.auth.userId,
          content: input.content,
        },
        select: defaultCommentSelector,
      });

      return createCommentDto({ comment, userId: ctx.auth.userId });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const comment = await prisma.comment.findUnique({
        where: {
          id: input.id,
        },
        select: defaultCommentSelector,
      });

      if (!comment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No comment with id '${input.id}'`,
        });
      }

      if (comment.author.id !== ctx.auth.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `Unauthorized: Invalid user id`,
        });
      }

      const updatedComment = await prisma.comment.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
        select: defaultCommentSelector,
      });
      return createCommentDto({
        comment: updatedComment,
        userId: ctx.auth.userId,
      });
    }),

  delete: privateProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const comment = await prisma.comment.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No comment with id '${input.id}'`,
        });
      }

      if (comment.authorId !== ctx.auth.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `Unauthorized: Invalid user id`,
        });
      }

      const childrenExists = await prisma.comment.findFirst({
        where: {
          parentCommentId: input.id,
        },
      });

      if (childrenExists) {
        const deletedComment = await prisma.comment.update({
          where: {
            id: input.id,
          },
          data: {
            content: '',
            status: 'deleted',
          },
          select: defaultCommentSelector,
        });

        return createCommentDto({
          comment: deletedComment,
          userId: ctx.auth.userId,
        });
      }

      await prisma.comment.delete({
        where: {
          id: input.id,
        },
      });
    }),
  reaction: privateProcedure
    .input(
      z.object({
        commentId: z.number(),
        type: z.enum(['like', 'dislike', 'cancel']),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.type === 'cancel') {
        await prisma.commentReaction.delete({
          where: {
            commentId_authorId: {
              commentId: input.commentId,
              authorId: ctx.auth.userId,
            },
          },
        });
        return;
      }
      await prisma.commentReaction.upsert({
        where: {
          commentId_authorId: {
            commentId: input.commentId,
            authorId: ctx.auth.userId,
          },
        },
        create: {
          commentId: input.commentId,
          authorId: ctx.auth.userId,
          reactionType: input.type,
        },
        update: {
          commentId: input.commentId,
          authorId: ctx.auth.userId,
          reactionType: input.type,
        },
      });
    }),
});
