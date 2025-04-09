import { api } from '@/trpc/react';

export const useMyCommunityListQuery = () => {
  return api.community.myList.useSuspenseQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
};
