import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { z } from 'zod';

import { commentService } from './comment.service';

export const commentRouter = createTRPCRouter({
  listByPostId: publicProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        parentCommentId: z.number().optional(),
        initialCursor: z.number().optional(),
        limit: z.number().min(1).max(100).default(5),
        order: z.enum(['asc', 'desc']).default('desc'),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const cursorId = input.cursor ?? input.initialCursor;

      const { comments, count } = await commentService.listByPostId({
        userId: ctx.userId,
        postId: input.postId,
        parentCommentId: input.parentCommentId ?? null,
        limit: input.limit,
        order: input.order,
        cursorId,
      });

      if (cursorId) comments.shift();

      let hasNextPage = false;
      if (comments.length > input.limit) {
        comments.pop();
        hasNextPage = true;
      }

      return {
        comments,
        hasNextPage,
        count,
      };
    }),
  listByParentCommentId: publicProcedure
    .input(
      z.object({
        parentCommentId: z.number(),
        initialCursor: z.number().optional(),
        limit: z.number().min(1).max(100).default(5),
        order: z.enum(['asc', 'desc']).default('asc'),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const cursorId = input.cursor ?? input.initialCursor;

      const { comments, count } = await commentService.listByParentCommentId({
        userId: ctx.userId,
        parentCommentId: input.parentCommentId,
        limit: input.limit,
        order: input.order,
        cursorId,
      });

      if (cursorId) comments.shift();

      let hasNextPage = false;
      if (comments.length > input.limit) {
        comments.pop();
        hasNextPage = true;
      }

      return {
        comments,
        hasNextPage,
        count,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await commentService.byId({
        commentId: input.id,
        userId: ctx.userId ?? undefined,
      });
    }),
  create: privateProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        content: z.string(),
        parentCommentId: z.number().optional(),
        targetUserId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await commentService.create({
        authorId: ctx.userId,
        postId: input.postId,
        parentCommentId: input.parentCommentId,
        content: input.content,
        targetUserId: input.targetUserId,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await commentService.update({
        authorId: ctx.userId,
        commentId: input.id,
        content: input.content,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await commentService.delete({
        commentId: input.id,
        userId: ctx.userId,
      });
    }),
});
