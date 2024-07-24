import { usePostContext } from '@/contexts/PostContext';

import { usePollDetailQuery } from '@/hooks/queries/usePollDetailQuery';
import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PollDetailChart from '../charts/PollDetailChart';
import LoadingBox from '../ui/LoadingBox';

const PollDetailSection = () => {
  const post = usePostContext();
  const [poll] = usePollQuery(post.id);
  const { data: pollDetail, isLoading } = usePollDetailQuery(post.id);

  return (
    <section className="relative mt-2 p-2 py-3 pl-0">
      <PollDetailChart
        choices={poll.choices.map((choice) => ({
          id: choice.id,
          text: choice.main,
        }))}
        counts={pollDetail?.counts}
        maxCount={pollDetail?.maxCount ?? 0}
      />
      {isLoading && (
        <LoadingBox className="flex-center absolute inset-0 rounded bg-base-content/20" />
      )}
    </section>
  );
};

export default PollDetailSection;
