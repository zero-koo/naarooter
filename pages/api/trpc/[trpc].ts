import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({
  router: appRouter,
  createContext(opts) {
    return createContext({
      type: 'api',
      ...opts,
    });
  },
});
