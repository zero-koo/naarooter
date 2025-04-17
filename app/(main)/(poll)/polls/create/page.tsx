import { HydrateClient } from '@/trpc/server';

import PollCreatePage from '@/components/poll/PollCreatePage';

export default function PollCreate() {
  return (
    <HydrateClient>
      <PollCreatePage />
    </HydrateClient>
  );
}
