import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '../../trpc';
import { communityService } from './community.service';

export const communityRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        topicId: z.number().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
        initialCursor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const lastId = input.cursor ?? input.initialCursor;

      const communities = await communityService.list({
        ...input,
        lastId,
      });

      let nextCursor: string | undefined = undefined;

      if (communities.length > input.limit) {
        const lastItem = communities.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        communities,
        nextCursor,
      };
    }),
  myList: privateProcedure
    .input(
      z.object({
        limit: z.number().default(1000),
      })
    )
    .query(async ({ input, ctx }) => {
      const communities = await communityService.list({
        ...input,
        userId: ctx.auth.userId,
      });

      return {
        communities,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await communityService.byId({
        id: input.id,
      });
    }),
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        topicId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await communityService.create({
        ...input,
        ownerId: ctx.auth.userId,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        topicId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await communityService.update({
        ...input,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const community = await communityService.byId({ id: input.id });
      if (community?.ownerId !== ctx.userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message:
            'You are not authorized to delete this community. Only the owner can perform this action.',
        });
      }
      return await communityService.delete(input.id);
    }),
  join: privateProcedure
    .input(
      z.object({
        communityId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await communityService.join({
        communityId: input.communityId,
        userId: ctx.userId,
      });
    }),
  checkName: privateProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await communityService.checkName({
        name: input.name,
      });
    }),
});
