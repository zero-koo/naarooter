import { Reaction } from '@/types/shared';
import { z } from 'zod';

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '../../trpc';
import { postReactionService } from './post-reaction.service';

export const postReactionRouter = createTRPCRouter({
  countByPostId: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(({ input, ctx }): Promise<Reaction> => {
      return postReactionService.countById({
        postId: input.postId,
        userId: ctx.userId,
      });
    }),
  upsert: privateProcedure
    .input(
      z.object({
        postId: z.string(),
        type: z.enum(['like', 'dislike']).nullable(),
      })
    )
    .mutation(({ input, ctx }): Promise<Reaction> => {
      return postReactionService.upsert({
        postId: input.postId,
        userId: ctx.userId,
        type: input.type,
      });
    }),
});
