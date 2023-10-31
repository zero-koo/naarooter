/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { privateProcedure, router } from '../trpc';

const defaultMBTISelect = Prisma.validator<Prisma.UserMbtiSelect>()({
  id: true,
  ei: true,
  sn: true,
  ft: true,
  jp: true,
  updatedAt: true,
});

export const userRouter = router({
  mbti: privateProcedure.query(async ({ ctx }) => {
    return await prisma.userMbti.findUnique({
      select: defaultMBTISelect,
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
  createMbti: privateProcedure
    .input(
      z.object({
        ei: z.enum(['E', 'I']),
        sn: z.enum(['S', 'N']),
        ft: z.enum(['F', 'T']),
        jp: z.enum(['J', 'P']),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await prisma.userMbti.create({
        select: defaultMBTISelect,
        data: {
          ...input,
          userId: ctx.auth.userId,
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
      return await prisma.userMbti.update({
        select: defaultMBTISelect,
        where: {
          userId: ctx.auth.userId,
        },
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
    }),
});
