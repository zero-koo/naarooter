import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from '@clerk/nextjs/server';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

// import { unstable_getServerSession } from 'next-auth';

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner({ auth }: AuthContext) {
  return {
    auth,
    // prisma
  };
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions & { type: 'api' | 'rsc' }
) {
  // for API-response caching see https://trpc.io/docs/caching

  if (opts.type === 'rsc') {
    // RSC
    return {
      type: opts.type,
      auth: getAuth(opts.req),
    };
  }
  // not RSC
  // const session = await unstable_getServerSession(
  //   opts.req,
  //   opts.res,
  //   nextAuthOptions
  // );
  return createContextInner({
    auth: getAuth(opts.req),
  });
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
