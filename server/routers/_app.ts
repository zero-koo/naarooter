/**
 * This file contains the root router of your tRPC-backend
 */
import { privateProcedure, publicProcedure, router } from '../trpc';
import { postRouter } from './tempPost';

export const appRouter = router({
  post: postRouter,
  // whoami: publicProcedure.query(({ ctx }) => ctx.user),
  secret: privateProcedure.query(() => 'cow level'),
});

export type AppRouter = typeof appRouter;
