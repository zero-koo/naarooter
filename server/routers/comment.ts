import { prisma } from '@/server/prisma';
import { z } from 'zod';

import { privateProcedure, publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';

const defaultCommentSelector = Prisma.validator<Prisma.CommentSelect>()({
  id: true,
  author: true,
  content: true,
  parentCommentId: true,
  createdAt: true,
  updatedAt: true,
});

export const commentRouter = router({
  list: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.number().nullish(),
        initialCursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const cursor = input.cursor ?? input.initialCursor;

      const [comments, count] = await prisma.$transaction([
        prisma.comment.findMany({
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
            updatedAt: true,
          },
          take: input.limit + 1,
          where: {
            postId: input.postId,
          },
          cursor: cursor
            ? {
                id: cursor,
              }
            : undefined,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        prisma.comment.count({ where: { postId: input.postId } }),
      ]);

      let nextCursor: number | undefined = undefined;
      if (comments.length > input.limit) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = comments.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        comments,
        nextCursor,
        totalCount: count,
      };
    }),
  add: privateProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        content: z.string(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await prisma.comment.create({
        data: {
          postId: input.postId,
          authorId: ctx.auth.userId,
          content: input.content,
        },
        select: defaultCommentSelector,
      });
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

      return await prisma.comment.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
        select: defaultCommentSelector,
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

      await prisma.comment.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
