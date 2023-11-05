import { usePollDetailQuery } from '@/hooks/queries/usePollDetailQuery';
import { Roboto_Mono } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

const roboto = Roboto_Mono({
  weight: '500',
  subsets: ['latin'],
});

const mbtis = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const;

type MBTI = (typeof mbtis)[number];

const PollDetailSection = ({ id }: { id: string }) => {
  const { data } = usePollDetailQuery(id);
  if (!data) return <section>loading</section>;
  console.log(data);

  data.choices.forEach((choice) => {
    console.log(data.counts.get(choice)?.get('INTP'));
  });

  return (
    <section className="mt-2 bg-base-200 p-2 pl-1.5">
      <div className="flex flex-col gap-1">
        {data.choices.map((choice, index) => (
          <div key={choice} className="flex gap-1">
            <div
              className={
                'flex w-1.5 items-start justify-end text-[8px] tabular-nums opacity-70'
              }
            >
              {index + 1}
            </div>
            {mbtis.map((mbti) => (
              <PollChartCell
                key={mbti}
                count={data.counts.get(choice)?.get(mbti) ?? 0}
                maxCount={data.maxCount ?? 1}
                mbti={mbti}
                choiceId={choice}
              />
            ))}
          </div>
        ))}
        <div className="mt-0.5 flex gap-1">
          <div className="w-1.5"></div>
          {mbtis.map((mbti) => (
            <div
              key={mbti}
              className={twMerge(
                roboto.className,
                'text-vertical flex-1 text-[10px] flex items-center opacity-70'
              )}
            >
              {mbti}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PollDetailSection;

const PollChartCell = ({
  count,
  maxCount,
}: {
  choiceId: string;
  mbti: MBTI;
  count: number;
  maxCount: number;
}) => {
  return (
    <div className="relative flex flex-1 items-center justify-center">
      <div className="z-0 w-full rounded bg-base-100 pb-[100%]"></div>
      <div
        className="absolute z-10 h-full w-full rounded bg-primary"
        style={{
          opacity: count / maxCount,
        }}
      ></div>
    </div>
  );
};
