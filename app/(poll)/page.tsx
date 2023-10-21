import { UserButton } from '@clerk/nextjs';

import PollList from '@/components/poll/PollList';

export default function PollsPage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
      <PollList />
    </div>
  );
}
