/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPollSelect = (userId: number) =>
  Prisma.validator<Prisma.PollSelect>()({
    id: true,
    title: true,
    description: true,
    authorId: true,
    choices: {
      select: {
        id: true,
        _count: true,
        main: true,
        sub: true,
        index: true,
        votes: {
          where: {
            authorId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    },
  });

export const pollRouter = router({
  list: publicProcedure
    .input(
      z.object({
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

      const items = await prisma.poll.findMany({
        select: defaultPollSelect(1),
        // get an extra item to know if there's a next page
        take: input.limit + 1,
        where: {},
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

      if (items.length > input.limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = items.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        items: items,
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
      const poll = await prisma.poll.findUnique({
        where: { id },
        select: defaultPollSelect(1),
      });
      if (!poll) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No poll with id '${id}'`,
        });
      }
      return poll;
    }),
  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1, 'Required').max(32),
        description: z.string(),
        choices: z.array(
          z.object({
            main: z.string().min(1, 'Required'),
            sub: z.string(),
            index: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const poll = await prisma.poll.create({
        data: {
          ...input,
          choices: {
            create: input.choices,
          },
          authorId: 1,
        },
        select: defaultPollSelect(1),
      });
      return poll;
    }),
});
