import { pollFixture } from '@/components/fixtures/poll';
import { Poll } from '@/types/poll';

export const pollAPI = {
  byId: (id: string): Promise<Poll> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(pollFixture), 300)
    );
  },
};
