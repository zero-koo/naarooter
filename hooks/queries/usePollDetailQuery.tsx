import { PollID } from '@/server/api/routers/poll/poll.type';
import { api } from '@/trpc/react';

export const usePollDetailQuery = (pollId: PollID) => {
  return api.poll.detailByPollId.useQuery(
    { pollId },
    {
      refetchOnWindowFocus: false,
    }
  );
};
