import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';

import { commentReactionRouter } from './routers/comment-reaction/comment-reaction.router';
import { commentRouter } from './routers/comment/comment.router';
import { pollRouter } from './routers/poll';
import { postReactionRouter } from './routers/post-reaction/post-reaction.router';
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
  post: postRouter,
  poll: pollRouter,
  vote: voteRouter,
  postReaction: postReactionRouter,
  comment: commentRouter,
  commentReaction: commentReactionRouter,
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