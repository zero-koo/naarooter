import { z } from 'zod';

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '../../trpc';
import { pollService } from './poll.service';

export const pollRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
        cursor: z.string().optional(),
        initialCursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const cursor = input.cursor ?? input.initialCursor;

      const polls = await pollService.list({
        userId: ctx.userId,
        cursorId: cursor,
        limit: input.limit,
        search: input.search,
      });

      let nextCursor: string | undefined = undefined;

      if (polls.length > input.limit) {
        const lastItem = polls.pop()!;
        nextCursor = lastItem.post.id;
      }

      return {
        polls,
        nextCursor,
      };
    }),
  myList: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        search: z.string().optional(),
        cursor: z.string().optional(),
        initialCursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const cursor = input.cursor ?? input.initialCursor;

      const polls = await pollService.list({
        authorId: ctx.userId,
        userId: ctx.userId,
        cursorId: cursor,
        limit: input.limit,
        search: input.search,
      });

      let nextCursor: string | undefined = undefined;

      if (polls.length > input.limit) {
        const lastItem = polls.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        polls,
        nextCursor,
      };
    }),
  getByPostId: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return pollService.getByPostId({
        postId: input.postId,
        userId: ctx.userId,
      });
    }),
  detailByPollId: privateProcedure
    .input(
      z.object({
        pollId: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return pollService.getDetailByPollId({
        pollId: input.pollId,
        userId: ctx.userId,
      });
    }),
  create: privateProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1, 'Required').max(32),
        communityId: z.string().nullable(),
        description: z.string(),
        images: z.array(z.string()),
        choices: z.array(
          z.object({
            main: z.string().min(1, 'Required'),
            imageUrl: z.string().optional(),
            index: z.number(),
          })
        ),
      })
    )
    .mutation(({ input, ctx }) => {
      return pollService.create({
        input: {
          ...input,
          authorId: ctx.userId,
        },
        userId: ctx.userId,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        title: z.string().min(1, 'Required').max(32),
        communityId: z.string().nullable(),
        description: z.string(),
        images: z.array(z.string()),
        choices: z.array(
          z.object({
            main: z.string().min(1, 'Required'),
            imageUrl: z.string().optional(),
            index: z.number(),
          })
        ),
      })
    )
    .mutation(({ input, ctx }) => {
      return pollService.update({
        input,
        userId: ctx.userId,
      });
    }),
});
