import { useSession } from 'next-auth/react';

export const useUser = () => {
  const session = useSession();

  const user = session.data?.user ?? null;
  const isAuthenticated = session.status === 'authenticated';

  return {
    user,
    isAuthenticated,
  };
};
