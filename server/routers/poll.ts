/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { countReactions } from '@/lib/utils';

import { PollTable } from '../models/PollTable';
import { privateProcedure, publicProcedure, router } from '../trpc';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

const defaultPollSelect = (userId: string) =>
  Prisma.validator<Prisma.PollSelect>()({
    id: true,
    post: {
      select: {
        id: true,
        title: true,
        description: true,
        images: true,
        authorId: true,
        postReaction: {
          select: {
            authorId: true,
            reactionType: true,
          },
        },
      },
    },
    choices: {
      select: {
        id: true,
        _count: {
          select: {
            votes: true,
          },
        },
        main: true,
        imageUrl: true,
        index: true,
      },
    },
    votes: {
      select: {
        pollChoiceId: true,
      },
      where: {
        authorId: userId,
      },
    },
  });

export const pollRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        search: z.string().nullish(),
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

      const items = await prisma.poll.findMany({
        select: defaultPollSelect(ctx.auth?.user?.id ?? ''),
        // get an extra item to know if there's a next page
        take: input.limit + 1,
        where: {
          AND: input.search?.split(' ').map((keyword) => ({
            post: {
              title: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          })),
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          post: {
            createdAt: 'desc',
          },
        },
      });

      let nextCursor: string | undefined = undefined;

      if (items.length > input.limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = items.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        items: items.map((item) => ({
          id: item!.post.id,
          pollId: item.id,
          authorId: item.post.authorId,
          title: item.post.title,
          description: item.post.description,
          images: item.post.images,
          choices:
            item.choices.map((choice) => ({
              id: choice.id,
              main: choice.main,
              imageUrl: choice.imageUrl,
              index: choice.index,
              voteCount: choice._count.votes,
              selected: item.votes[0]?.pollChoiceId === choice.id,
            })) ?? [],
          voted: item.votes.length > 0,
          postReaction: countReactions(
            item.post.postReaction,
            ctx.auth?.user?.id
          ),
        })),
        nextCursor,
      };
    }),
  myList: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        search: z.string().nullish(),
        cursor: z.string().nullish(),
        initialCursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const cursor = input.cursor ?? input.initialCursor;

      const items = await prisma.poll.findMany({
        select: defaultPollSelect(ctx.auth?.user?.id),
        // get an extra item to know if there's a next page
        take: input.limit + 1,
        where: {
          votes: {
            some: {
              authorId: ctx.auth?.user?.id,
            },
          },
          AND: input.search?.split(' ').map((keyword) => ({
            post: {
              title: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          })),
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          post: {
            createdAt: 'desc',
          },
        },
      });

      let nextCursor: string | undefined = undefined;

      if (items.length > input.limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastItem = items.pop()!;
        nextCursor = lastItem.id;
      }

      return {
        items: items.map((item) => ({
          id: item!.post.id,
          pollId: item.id,
          authorId: item.post.authorId,
          title: item.post.title,
          description: item.post.description,
          images: item.post.images,
          choices:
            item.choices.map((choice) => ({
              id: choice.id,
              main: choice.main,
              imageUrl: choice.imageUrl,
              index: choice.index,
              voteCount: choice._count.votes,
              selected: item.votes[0]?.pollChoiceId === choice.id,
            })) ?? [],
          voted: item.votes.length > 0,
          postReaction: countReactions(
            item.post.postReaction,
            ctx.auth?.user?.id
          ),
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
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const poll = await prisma.poll.findUnique({
        where: { postId: id },
        select: defaultPollSelect(ctx.auth?.user?.id ?? ''),
      });
      if (!poll) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No poll with id '${id}'`,
        });
      }
      return {
        id: poll.post.id,
        pollId: poll.id,
        authorId: poll.post.authorId,
        title: poll.post.title,
        description: poll.post.description,
        images: poll.post.images,
        choices: poll.choices.map((choice) => ({
          id: choice.id,
          main: choice.main,
          imageUrl: choice.imageUrl,
          index: choice.index,
          voteCount: choice._count.votes,
          selected: poll.votes[0]?.pollChoiceId === choice.id,
        })),
        voted: poll.votes.length > 0,
        postReaction: countReactions(
          poll.post.postReaction,
          ctx.auth?.user?.id
        ),
      };
    }),
  add: privateProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1, 'Required').max(32),
        description: z.string(),
        images: z.array(z.string()).optional(),
        choices: z.array(
          z.object({
            main: z.string().min(1, 'Required'),
            imageUrl: z.string().optional(),
            index: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const poll = await prisma.poll.create({
        data: {
          id: input.id,
          post: {
            create: {
              title: input.title,
              description: input.description,
              images: input.images ?? [],
              type: 'POLL',
              authorId: ctx.auth?.userId,
            },
          },
          choices: {
            create: input.choices,
          },
        },
        select: defaultPollSelect(ctx.auth?.user?.id ?? undefined),
      });
      return {
        id: poll.post.id,
        pollId: poll.id,
        title: poll.post.title,
        description: poll.post.description,
        choices: poll.choices,
      };
    }),
  detail: privateProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const poll = await prisma.poll.findUnique({
        where: {
          postId: input.id,
        },
        select: {
          postId: true,
          choices: {
            select: {
              id: true,
              index: true,
            },
          },
          votes: {
            select: {
              pollChoiceId: true,
              author: {
                select: {
                  mbti: true,
                },
              },
            },
          },
        },
      });

      if (!poll) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No poll with id '${input.id}'`,
        });
      }

      const pollTable = new PollTable(
        poll.votes.map((vote) => ({
          choiceId: vote.pollChoiceId,
          mbti: vote.author.mbti!,
        })),
        poll.choices
          .sort((prev, curr) => (prev.index < curr.index ? -1 : 1))
          .map((choice) => choice.id)
      );

      return {
        choices: poll.choices
          .sort((prev, curr) => (prev.index < curr.index ? -1 : 1))
          .map((choice) => choice.id),
        counts: pollTable.countByChoiceToMBTI,
        maxCount: pollTable.maxCountByChoiceToMBTI,
      };
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
});
