import { useRouter } from 'next/navigation';
import { usePostContext } from '@/contexts/PostContext';
import { api, RouterOutputs } from '@/trpc/react';

import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PostShowHeaderContent from '../post/PostShowHeaderContent';
import GrayBox from '../ui/GrayBox';
import PollSubmitForm from './PollSubmitForm';

const PollListItem: React.FC<{
  initialData?: RouterOutputs['poll']['getByPostId'];
}> = ({ initialData }) => {
  const router = useRouter();
  const apiUtils = api.useUtils();

  const { id } = usePostContext();
  const [poll] = usePollQuery(id, {
    initialData,
  });
  apiUtils.post.byId.setData(
    {
      id: poll.post.id,
    },
    poll.post
  );

  return (
    <GrayBox
      className="py-2"
      onClick={() => router.push(`/polls/${poll.post.id}`)}
    >
      <PostShowHeaderContent className="px-3" />
      <PollSubmitForm />
    </GrayBox>
  );
};

export default PollListItem;
