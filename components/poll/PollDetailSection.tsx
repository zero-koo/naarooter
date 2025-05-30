import { usePostContext } from '@/contexts/PostContext';

import { usePollDetailQuery } from '@/hooks/queries/usePollDetailQuery';
import { usePollQuery } from '@/hooks/queries/usePollQuery';

import PollDetailChart from '../charts/PollDetailChart';
import LoadingBox from '../ui/LoadingBox';

const PollDetailSection = () => {
  const post = usePostContext();
  const [poll] = usePollQuery(post.id);
  const { data: pollDetail, isLoading } = usePollDetailQuery(poll.id);

  return (
    <section className="relative mt-2 p-2 py-3 pl-0">
      <PollDetailChart
        choices={poll.choices.map((choice) => ({
          id: choice.id,
          text: choice.main,
        }))}
        counts={pollDetail?.choices}
        maxCount={pollDetail?.maxCount ?? 0}
      />
      {isLoading && (
        <LoadingBox className="flex-center bg-foreground/20 absolute inset-0 rounded-md" />
      )}
    </section>
  );
};

export default PollDetailSection;
