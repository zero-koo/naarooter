/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from '../trpc';
import { commentRouter } from './comment';
import { pollRouter } from './poll';
import { postRouter } from './post';
import { userRouter } from './user';
import { voteRouter } from './vote';

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  poll: pollRouter,
  vote: voteRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;
