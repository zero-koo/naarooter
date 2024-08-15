/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { prisma } from '@/server/prisma';
import { Post } from '@/types/post';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { countReactions } from '@/lib/utils';

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  description: true,
  authorId: true,
  type: true,
  groupId: true,
  author: {
    select: {
      id: true,
      name: true,
      mbti: true,
    },
  },
  _count: {
    select: {
      comment: true,
    },
  },
  postReaction: {
    select: {
      authorId: true,
      reactionType: true,
    },
  },
  createdAt: true,
  viewCount: true,
});

export const postRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        groupId: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().nullish(),
        initialCursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const cursor = input.cursor ?? input.initialCursor;

      const posts = await prisma.post.findMany({
        select: defaultPostSelect,
        // get an extra item to know if there's a next page
        take: input.limit + 1,
        where: {
          groupId: input.groupId,
          AND: input.search?.split(' ').map((keyword) => ({
            title: {
              contains: keyword,
              mode: 'insensitive',
            },
          })),
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: string | undefined = undefined;

      if (posts.length > input.limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = posts.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        posts: posts.map((post) => ({
          ...post,
          postReaction: countReactions(post.postReaction, ctx.auth?.user?.id),
        })),
        nextCursor,
      };
    }),
  myList: privateProcedure
    .input(
      z.object({
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().nullish(),
        initialCursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const cursor = input.cursor ?? input.initialCursor;

      const posts = await prisma.post.findMany({
        select: defaultPostSelect,
        // get an extra item to know if there's a next page
        take: input.limit + 1,
        where: {
          authorId: ctx.auth.user.id,
          AND: input.search?.split(' ').map((keyword) => ({
            title: {
              contains: keyword,
              mode: 'insensitive',
            },
          })),
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: string | undefined = undefined;

      if (posts.length > input.limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = posts.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        posts: posts.map((post) => ({
          ...post,
          postReaction: countReactions(post.postReaction, ctx.auth.user.id),
        })),
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }): Promise<Post> => {
      const { id } = input;
      const post = await prisma.post.findUnique({
        where: { id },
        select: defaultPostSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }

      // const updatedViewCount = await updateViewCount(
      //   id,
      //   String(ctx.req.headers['x-forwarded-for'])
      // );

      return {
        id: post.id,
        author: {
          id: post.author.id,
          name: post.author.name,
          mbti: post.author.mbti,
          isMe: post.author.id === ctx.auth?.user?.id,
        },
        communityId: post.groupId!, // TODO: Remove type assertion
        title: post.title,
        description: post.description,
        type: post.type,
        images: [], // TODO: Add images property.
        reaction: countReactions(post.postReaction, ctx.auth?.user?.id),
        viewCount: post.viewCount,
        createdAt: post.createdAt,
      };
    }),
  add: privateProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1, 'Required').max(32),
        groupId: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await prisma.post.create({
        data: {
          id: input.id,
          title: input.title,
          description: input.description,
          groupId: input.groupId,
          type: 'POST',
          authorId: ctx.auth.user.id,
        },
        select: defaultPostSelect,
      });
      return post;
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1, 'Required').max(32),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await prisma.post.findUnique({
        where: { id: input.id },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${input.id}'`,
        });
      }
      if (post.authorId !== ctx.auth.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }
      return await prisma.post.update({
        where: { id: input.id },
        data: {
          id: input.id,
          title: input.title,
          description: input.description,
          type: 'POST',
          authorId: ctx.auth.userId,
        },
        select: defaultPostSelect,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await prisma.post.findUnique({
        where: { id: input.id },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${input.id}'`,
        });
      }
      if (post.authorId !== ctx.auth.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      return await prisma.post.delete({
        where: { id: input.id },
      });
    }),
  comment: privateProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.number().nullish(),
        initialCursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const cursor = input.cursor ?? input.initialCursor;

      const comments = await prisma.comment.findMany({
        select: {
          id: true,
          author: {
            select: {
              id: true,
              mbti: true,
              name: true,
            },
          },
          content: true,
          updatedAt: true,
        },
        take: input.limit + 1,
        where: {
          postId: input.postId,
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: number | undefined = undefined;

      if (comments.length > input.limit) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = comments.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        comments,
        nextCursor,
      };
    }),
  reaction: privateProcedure
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

// TODO: Replace in-memory cache
const viewCountCache = new Set<string>();
const VIEW_LIMIT_TIME = 5 * 60 * 1000; // 5 minutes
async function updateViewCount(
  postId: string,
  userIP: string
): Promise<number | void> {
  const cacheKey = `${postId}-${userIP}`;
  if (viewCountCache.has(cacheKey)) return;

  viewCountCache.add(cacheKey);
  setTimeout(() => viewCountCache.delete(cacheKey), VIEW_LIMIT_TIME);

  const { viewCount } = await prisma.post.update({
    where: { id: postId },
    data: {
      viewCount: {
        increment: 1,
      },
    },
    select: {
      viewCount: true,
    },
  });
  return viewCount;
}
