/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { privateProcedure, publicProcedure, router } from '../trpc';

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  description: true,
  authorId: true,
  groupId: true,
  author: {
    select: {
      id: true,
      name: true,
      mbti: true,
    },
  },
  _count: {
    select: {
      comment: true,
    },
  },
  createdAt: true,
});

export const postRouter = router({
  list: publicProcedure
    .input(
      z.object({
        groupId: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().nullish(),
        initialCursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const cursor = input.cursor ?? input.initialCursor;

      const posts = await prisma.post.findMany({
        select: defaultPostSelect,
        // get an extra item to know if there's a next page
        take: input.limit + 1,
        where: {
          type: 'POST',
          groupId: input.groupId,
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

      let nextCursor: string | undefined = undefined;

      if (posts.length > input.limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = posts.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const post = await prisma.post.findUnique({
        where: { id },
        select: defaultPostSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    }),
  add: privateProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1, 'Required').max(32),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await prisma.post.create({
        data: {
          id: input.id,
          title: input.title,
          description: input.description,
          type: 'POST',
          authorId: ctx.auth.userId,
        },
        select: defaultPostSelect,
      });
      return post;
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1, 'Required').max(32),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await prisma.post.findUnique({
        where: { id: input.id },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${input.id}'`,
        });
      }
      if (post.authorId !== ctx.auth.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }
      return await prisma.post.update({
        where: { id: input.id },
        data: {
          id: input.id,
          title: input.title,
          description: input.description,
          type: 'POST',
          authorId: ctx.auth.userId,
        },
        select: defaultPostSelect,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await prisma.post.findUnique({
        where: { id: input.id },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${input.id}'`,
        });
      }
      if (post.authorId !== ctx.auth.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      return await prisma.post.delete({
        where: { id: input.id },
      });
    }),
  comment: privateProcedure
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
});
