/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from '../trpc';
import { pollRouter } from './poll';
import { userRouter } from './user';
import { voteRouter } from './vote';

export const appRouter = router({
  user: userRouter,
  poll: pollRouter,
  vote: voteRouter,
});

export type AppRouter = typeof appRouter;
