import z from 'zod';

import { prisma } from '../../prisma';
import { createTRPCRouter, privateProcedure } from '../trpc';

export const voteRouter = createTRPCRouter({
  vote: privateProcedure
    .input(
      z.object({
        pollId: z.string(),
        choiceId: z.string(),
      })
    )
    .mutation(async ({ input: { pollId, choiceId }, ctx }) => {
      const vote = await prisma.vote.findFirst({
        where: {
          authorId: ctx.auth.userId,
          pollId,
        },
      });

      // Create
      if (!vote) {
        return await prisma.vote.create({
          data: {
            authorId: ctx.auth.userId,
            pollId,
            pollChoiceId: choiceId,
          },
        });
      }

      // Delete
      if (vote.pollChoiceId === choiceId) {
        await prisma.vote.delete({
          where: {
            id: vote.id,
          },
        });
        return;
      }

      // Update
      return await prisma.vote.update({
        data: {
          pollChoiceId: choiceId,
        },
        where: {
          authorId: ctx.auth.userId,
          id: vote.id,
        },
      });
    }),
  add: privateProcedure
    .input(
      z.object({
        pollId: z.string(),
        choiceId: z.string(),
      })
    )
    .mutation(async ({ input: { pollId, choiceId }, ctx }) => {
      return await prisma.vote.create({
        data: {
          authorId: ctx.auth.userId,
          pollId,
          pollChoiceId: choiceId,
        },
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        choiceId: z.string(),
      })
    )
    .mutation(async ({ input: { id, choiceId }, ctx }) => {
      return await prisma.vote.update({
        data: {
          pollChoiceId: choiceId,
        },
        where: {
          authorId: ctx.auth.userId,
          id,
        },
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input: { id } }) => {
      return prisma.vote.delete({
        where: {
          id,
        },
      });
    }),
});
