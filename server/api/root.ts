import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';

import { commentReactionRouter } from './routers/comment-reaction/comment-reaction.router';
import { commentRouter } from './routers/comment/comment.router';
import { communityRouter } from './routers/community/community.router';
import { pollRouter } from './routers/poll/poll.router';
import { postReactionRouter } from './routers/post-reaction/post-reaction.router';
import { postRouter } from './routers/post/post.router';
import { userRouter } from './routers/user/user.router';
import { voteRouter } from './routers/vote/vote.router';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  community: communityRouter,
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
