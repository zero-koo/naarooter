/**
 * This file contains the root router of your tRPC-backend
 */
import { privateProcedure, publicProcedure, router } from '../trpc';
import { pollRouter } from './poll';
import { voteRouter } from './vote';

export const appRouter = router({
  poll: pollRouter,
  vote: voteRouter,
  // whoami: publicProcedure.query(({ ctx }) => ctx.user),
  secret: privateProcedure.query(() => 'cow level'),
});

export type AppRouter = typeof appRouter;
