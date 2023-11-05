/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from '../trpc';
import { commentRouter } from './comment';
import { pollRouter } from './poll';
import { userRouter } from './user';
import { voteRouter } from './vote';

export const appRouter = router({
  user: userRouter,
  poll: pollRouter,
  vote: voteRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;
