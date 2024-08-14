import { createTRPCRouter, privateProcedure } from '@/server/api/trpc';
import { z } from 'zod';

import { mbtis } from '@/lib/constants';

import { userRepository } from './user.repository';

export const userRouter = createTRPCRouter({
  me: privateProcedure.query(({ ctx }) => {
    return userRepository.getById(ctx.auth.userId);
  }),
  mbti: privateProcedure.query(async ({ ctx }) => {
    const user = await userRepository.getById(ctx.auth.userId);
    return {
      id: user.id,
      mbti: user.mbti,
    };
  }),
  update: privateProcedure
    .input(
      z.object({
        name: z.string().optional(),
        mbti: z.enum(mbtis).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return userRepository.updateUserById({
        userId: ctx.auth.userId,
        name: input.name,
        mbti: input.mbti,
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
    .mutation(({ input, ctx }) => {
      return userRepository.updateUserById({
        userId: ctx.auth.userId,
        mbti: `${input.ei}${input.sn}${input.ft}${input.jp}`,
      });
    }),
  withdraw: privateProcedure.mutation(({ ctx }) => {
    return userRepository.withdraw(ctx.auth.userId);
  }),
});
