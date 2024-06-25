import { usePollDetailQuery } from '@/hooks/queries/usePollDetailQuery';
import { usePollQuery } from '@/hooks/queries/usePollQuery';
import PollDetailChart from '../charts/PollDetailChart';

const PollDetailSection = ({ id }: { id: string }) => {
  const { data: poll } = usePollQuery(id);
  const { data: pollDetail } = usePollDetailQuery(id);

  if (!pollDetail) return <section>loading</section>;

  return (
    <section className="mt-2 p-2 py-3 pl-0">
      <PollDetailChart
        choices={poll.choices.map((choice) => ({
          id: choice.id,
          text: choice.main,
        }))}
        counts={pollDetail.counts}
        maxCount={pollDetail.maxCount}
      />
    </section>
  );
};

export default PollDetailSection;
