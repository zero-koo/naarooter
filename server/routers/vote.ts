import z from 'zod';

import { prisma } from '../prisma';
import { privateProcedure, router } from '../trpc';

export const voteRouter = router({
  add: privateProcedure
    .input(
      z.object({
        choiceId: z.string(),
      })
    )
    .mutation(async ({ input: { choiceId }, ctx }) => {
      return await prisma.vote.create({
        data: {
          authorId: ctx.auth.userId,
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
