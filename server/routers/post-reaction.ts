/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { prisma } from '@/server/prisma';
import { Reaction } from '@/types/shared';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { privateProcedure, publicProcedure, router } from '../trpc';

const defaultPostReactionSelect = Prisma.validator<Prisma.PostReactionSelect>()(
  {
    authorId: true,
    reactionType: true,
  }
);

export const postReactionRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ input, ctx }): Promise<Reaction> => {
      const [likeCount, dislikeCount, selectedReaction] = await Promise.all([
        prisma.postReaction.count({
          where: {
            postId: input.postId,
            reactionType: 'like',
          },
        }),
        prisma.postReaction.count({
          where: {
            postId: input.postId,
            reactionType: 'dislike',
          },
        }),
        ctx.auth?.user?.id
          ? prisma.postReaction.findUnique({
              where: {
                postId_authorId: {
                  postId: input.postId,
                  authorId: ctx.auth.user.id,
                },
              },
              select: {
                reactionType: true,
              },
            })
          : null,
      ]);

      return {
        likeCount,
        dislikeCount,
        selectedReaction: selectedReaction?.reactionType,
      };
    }),
  update: privateProcedure
    .input(
      z.object({
        postId: z.string(),
        type: z.enum(['like', 'dislike', 'cancel']),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.type === 'cancel') {
        await prisma.postReaction.delete({
          where: {
            postId_authorId: {
              postId: input.postId,
              authorId: ctx.auth.userId,
            },
          },
        });
        return;
      }
      await prisma.postReaction.upsert({
        where: {
          postId_authorId: {
            postId: input.postId,
            authorId: ctx.auth.userId,
          },
        },
        create: {
          postId: input.postId,
          authorId: ctx.auth.userId,
          reactionType: input.type,
        },
        update: {
          postId: input.postId,
          authorId: ctx.auth.userId,
          reactionType: input.type,
        },
      });
    }),
});
