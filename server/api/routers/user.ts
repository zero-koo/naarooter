/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { prisma } from '@/server/prisma';
import { MBTI, Prisma } from '@prisma/client';
import { z } from 'zod';

import { mbtis } from '@/lib/constants';

import { createTRPCRouter, privateProcedure } from '../trpc';

const defaultMBTISelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  mbti: true,
  updatedAt: true,
});

export const userRouter = createTRPCRouter({
  me: privateProcedure.query(async ({ ctx }) => {
    return await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        mbti: true,
      },
      where: {
        id: ctx.auth.userId,
      },
    });
  }),
  update: privateProcedure
    .input(
      z.object({
        name: z.string().optional(),
        mbti: z.enum(mbtis).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await prisma.user.update({
        select: {
          id: true,
          name: true,
          mbti: true,
        },
        where: {
          id: ctx.auth.userId,
        },
        data: {
          ...input,
        },
      });
    }),
  mbti: privateProcedure.query(async ({ ctx }) => {
    return await prisma.user.findUnique({
      select: defaultMBTISelect,
      where: {
        id: ctx.auth.userId,
      },
    });
  }),
  updateMbti: privateProcedure
    .input(
      z.object({
        ei: z.enum(['E', 'I']),
        sn: z.enum(['S', 'N']),
        ft: z.enum(['F', 'T']),
        jp: z.enum(['J', 'P']),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await prisma.user.update({
        select: defaultMBTISelect,
        where: {
          id: ctx.auth.userId,
        },
        data: {
          mbti: `${input.ei}${input.sn}${input.ft}${input.jp}`,
        },
      });
    }),
  withdraw: privateProcedure.mutation(async ({ ctx }) => {
    return prisma.user.update({
      select: defaultMBTISelect,
      where: {
        id: ctx.auth.userId,
      },
      data: {
        email: undefined,
        name: undefined,
        status: 'DELETED',
      },
    });
  }),
});
