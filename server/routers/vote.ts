import z from 'zod';

import { prisma } from '../prisma';
import { privateProcedure, router } from '../trpc';

export const voteRouter = router({
  add: privateProcedure
    .input(
      z.object({
        userId: z.number(),
        choiceId: z.string(),
      })
    )
    .mutation(async ({ input: { userId, choiceId } }) => {
      return await prisma.vote.create({
        data: {
          authorId: userId,
          pollChoiceId: choiceId,
        },
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        userId: z.number(),
        choiceId: z.string(),
      })
    )
    .mutation(async ({ input: { id, userId, choiceId } }) => {
      return await prisma.vote.update({
        data: {
          pollChoiceId: choiceId,
        },
        where: {
          authorId: userId,
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
