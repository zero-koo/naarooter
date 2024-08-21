import { createTRPCRouter, privateProcedure } from '@/server/api/trpc';
import z from 'zod';

import { voteService } from './vote.service';

export const voteRouter = createTRPCRouter({
  vote: privateProcedure
    .input(
      z.object({
        pollId: z.string(),
        choiceId: z.string().nullable(),
      })
    )
    .mutation(async ({ input: { pollId, choiceId }, ctx }) => {
      return await voteService.vote({
        pollId,
        pollChoiceId: choiceId,
        userId: ctx.userId,
      });
    }),
});
