import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { z } from 'zod';

import { postService } from './post.service';
import { Post } from './post.type';

export const postRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        communityId: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
        initialCursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const lastId = input.cursor ?? input.initialCursor;

      const posts = await postService.list({
        ...input,
        communityId: input.communityId,
        lastId,
        userId: ctx.auth?.user?.id ?? null,
      });

      let nextCursor: string | undefined = undefined;

      if (posts.length > input.limit) {
        const lastItem = posts.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
  myList: privateProcedure
    .input(
      z.object({
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
        initialCursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const lastId = input.cursor ?? input.initialCursor;

      const posts = await postService.list({
        ...input,
        lastId,
        authorId: ctx.auth.user.id,
        userId: ctx.auth.user.id,
      });

      let nextCursor: string | undefined = undefined;

      if (posts.length > input.limit) {
        const lastItem = posts.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }): Promise<Post> => {
      return postService.byId({
        postId: input.id,
        userId: ctx.userId,
      });
    }),
  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1, 'Required').max(32),
        communityId: z.string(),
        description: z.string(),
        images: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return postService.create({
        input,
        userId: ctx.userId,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        title: z.string().min(1, 'Required').max(32),
        description: z.string(),
        images: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return postService.update({
        input,
        userId: ctx.userId,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return postService.delete({
        postId: input.postId,
        userId: ctx.userId,
      });
    }),
});
