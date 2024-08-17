import { Reaction } from '@/types/shared';
import { z } from 'zod';

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '../../trpc';
import { commentReactionService } from './comment-reaction.service';

export const commentReactionRouter = createTRPCRouter({
  countByPostId: publicProcedure
    .input(
      z.object({
        commentId: z.number(),
      })
    )
    .query(({ input, ctx }): Promise<Reaction> => {
      return commentReactionService.countById({
        commentId: input.commentId,
        userId: ctx.userId,
      });
    }),
  upsert: privateProcedure
    .input(
      z.object({
        commentId: z.number(),
        type: z.enum(['like', 'dislike']).nullable(),
      })
    )
    .mutation(({ input, ctx }): Promise<Reaction> => {
      return commentReactionService.upsert({
        commentId: input.commentId,
        userId: ctx.userId,
        type: input.type,
      });
    }),
});
