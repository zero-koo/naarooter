import { prisma } from '@/server/prisma';
import { z } from 'zod';

import { privateProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';

export const commentRouter = router({
  comments: privateProcedure
    .input(
      z.object({
        pollId: z.string().uuid(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.number().nullish(),
        initialCursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const cursor = input.cursor ?? input.initialCursor;

      const comments = await prisma.comment.findMany({
        select: {
          id: true,
          author: {
            select: {
              id: true,
              mbti: true,
              name: true,
            },
          },
          text: true,
          updatedAt: true,
        },
        take: input.limit + 1,
        where: {
          pollId: input.pollId,
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: number | undefined = undefined;
      if (comments.length > input.limit) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = comments.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        comments,
        nextCursor,
      };
    }),
  add: privateProcedure
    .input(
      z.object({
        pollId: z.string().uuid(),
        text: z.string(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const comment = await prisma.comment.create({
        data: {
          pollId: input.pollId,
          authorId: ctx.auth.userId,
          text: input.text,
        },
      });

      return {
        id: comment.id,
      };
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        text: z.string(),
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

      await prisma.comment.update({
        where: {
          id: input.id,
        },
        data: {
          text: input.text,
        },
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
