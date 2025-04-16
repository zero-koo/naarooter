import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { usePostContext } from '@/contexts/PostContext';
import { api, RouterOutputs } from '@/trpc/react';

import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PostShowHeaderContent from '../post/PostShowHeaderContent';
import GrayBox from '../ui/GrayBox';
import PollSubmitForm from './PollSubmitForm';

const PollListItem: React.FC<{
  initialData?: RouterOutputs['poll']['getByPostId'];
  backLink?: string;
}> = ({ initialData }) => {
  const pathName = usePathname();
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
    <Link href={`${pathName === '/' ? '' : pathName}/poll/${poll.post.id}`}>
      <GrayBox className="py-2">
        <PostShowHeaderContent className="px-3" />
        <PollSubmitForm />
      </GrayBox>
    </Link>
  );
};

export default PollListItem;
