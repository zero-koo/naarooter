import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { prisma } from './server/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  events: {
    async signIn({ user, isNewUser }) {
      if (!isNewUser) return;

      const userData = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!userData) {
        throw Error('User data should exist!');
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: `user_${userData.id.substring(16)}`,
        },
      });
    },
  },

  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  ...authConfig,
});
