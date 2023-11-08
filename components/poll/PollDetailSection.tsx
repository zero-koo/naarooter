import { usePollDetailQuery } from '@/hooks/queries/usePollDetailQuery';
import { Roboto_Mono } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { usePollQuery } from '@/hooks/queries/usePollQuery';

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
  const { data: poll } = usePollQuery(id);
  const { data: pollDetail } = usePollDetailQuery(id);

  if (!pollDetail) return <section>loading</section>;

  pollDetail.choices.forEach((choice) => {
    console.log(pollDetail.counts.get(choice)?.get('INTP'));
  });

  return (
    <section className="mt-2 bg-base-200 p-2 pl-1.5">
      <div className="flex flex-col gap-1">
        {pollDetail.choices.map((choice, index) => (
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
                mbti={mbti}
                choice={poll.choices[index].main}
                count={pollDetail.counts.get(choice)?.get(mbti) ?? 0}
                maxCount={pollDetail.maxCount || 1}
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
  choice,
  mbti,
  count,
  maxCount,
}: {
  choice: string;
  mbti: MBTI;
  count: number;
  maxCount: number;
}) => {
  return (
    <Popover>
      <PopoverTrigger className="relative flex flex-1 items-center justify-center">
        <div className="z-0 w-full rounded bg-base-100 pb-[100%]"></div>
        <div
          className="absolute z-10 h-full w-full rounded bg-primary hover:bg-primary-focus"
          style={{
            opacity: count / maxCount,
          }}
        ></div>
      </PopoverTrigger>
      <PopoverContent
        className="min-w-[40px] max-w-[100px] overflow-hidden rounded-md border-none bg-popover/80 p-1 px-1.5 text-xs leading-normal"
        align="start"
        alignOffset={-5}
        collisionPadding={5}
      >
        <div>
          <span className="font-semibold">{count}</span>
          <span className="ml-[1px] text-[8px]">명</span>
        </div>
        <div className="gap-x-0.5 text-[8px]">
          <div className="truncate">{choice}</div>
          <div className="">{mbti}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
