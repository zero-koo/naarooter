import { useRouter } from 'next/navigation';
import { usePostContext } from '@/contexts/PostContext';

import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PostShowHeaderContent from '../post/PostShowHeaderContent';
import GrayBox from '../ui/GrayBox';
import PollSubmitForm from './PollSubmitForm';

const PollListItem = () => {
  const router = useRouter();
  const { id } = usePostContext();
  const [poll] = usePollQuery(id);

  return (
    <GrayBox className="py-2" onClick={() => router.push(`/polls/${poll.id}`)}>
      <PostShowHeaderContent className="px-3" />
      <PollSubmitForm />
    </GrayBox>
  );
};

export default PollListItem;
