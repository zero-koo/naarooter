import { trpc } from '@/client/trpcClient';

export const usePostQuery = (id: string) => {
  return trpc.post.byId.useSuspenseQuery(
    { id },
    {
      refetchOnWindowFocus: false,
    }
  );
};
