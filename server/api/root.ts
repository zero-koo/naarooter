import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';

import { commentRouter } from './routers/comment';
import { pollRouter } from './routers/poll';
import { postRouter as postRouterV0 } from './routers/post';
import { postReactionRouter } from './routers/post-reaction';
import { postRouter } from './routers/post/post.router';
import { userRouter } from './routers/user/user.router';
import { voteRouter } from './routers/vote';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  postV0: postRouterV0,
  post: postRouter,
  poll: pollRouter,
  vote: voteRouter,
  postReaction: postReactionRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
