import * as d3 from 'd3';
import style from './PollDetailChart.module.css';
import { MBTI } from '@/types/shared';
import { mbtis } from '@/lib/constants';
import ChartCell from './ChartCell';
import { Roboto_Mono } from 'next/font/google';
import HorizontalBarChart from './HorizontalBarChart';
import { CSSProperties, useState } from 'react';
import VerticalBarChart from './VerticalBarChart';
import { cn } from '@/lib/utils';
import ChartCellPopover from './ChartCellPopover';

type PollDetailChartProps = {
  choices: Array<{
    id: string;
    text: string;
  }>;
  counts: d3.InternMap<string, d3.InternMap<MBTI, number>>;
  maxCount: number;
};

const roboto = Roboto_Mono({
  weight: '500',
  subsets: ['latin'],
});

const PollDetailChart = ({
  choices,
  counts,
  maxCount,
}: PollDetailChartProps) => {
  const [selectedMbti, setSelectedMbti] = useState<MBTI | null>(null);

  const countsPerSelectedMbti = choices.map((choice) => {
    return {
      id: choice.id,
      text: choice.text,
      count: selectedMbti ? counts.get(choice.id)?.get(selectedMbti!) ?? 0 : 0,
    };
  });

  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const countsPerSelectedChoice = mbtis.map((mbti) => {
    return {
      text: mbti,
      count: selectedChoiceId
        ? counts.get(selectedChoiceId)?.get(mbti) ?? 0
        : 0,
    };
  });

  return (
    <div
      className={style.grid}
      style={{ '--rows': choices.length } as CSSProperties}
    >
      <div className={style.bubble}>
        {choices.map((choice, index) => (
          <div className={style.bubbleRow} key={index}>
            {mbtis.map((mbti) => {
              const count = counts.get(choice.id)?.get(mbti) ?? 0;
              return (
                <ChartCellPopover
                  key={mbti}
                  mbti={mbti}
                  choice={choices[index].text}
                  count={count}
                  className="flex flex-1 items-center justify-center"
                  alignOffset={-5}
                >
                  <ChartCell opacity={count / (maxCount || 1)} />
                </ChartCellPopover>
              );
            })}
          </div>
        ))}
      </div>
      {selectedMbti && (
        <HorizontalBarChart
          data={countsPerSelectedMbti}
          mbti={selectedMbti}
          maxCount={maxCount}
        />
      )}
      {selectedChoiceId && (
        <VerticalBarChart
          data={countsPerSelectedChoice}
          choice={
            choices.find((choice) => choice.id === selectedChoiceId)!.text
          }
          maxCount={maxCount}
        />
      )}
      <YAxis
        choices={choices.map(({ id }) => ({
          id,
          isSelected: selectedChoiceId === id,
        }))}
        onSelect={(choiceId: string) => {
          setSelectedChoiceId((id) => (id === choiceId ? null : choiceId));
          setSelectedMbti(null);
        }}
      />
      <XAxis
        selectedMbti={selectedMbti}
        onSelect={(mbti) => {
          setSelectedMbti((selectedMbti) =>
            selectedMbti === mbti ? null : mbti
          );
          setSelectedChoiceId(null);
        }}
      />
    </div>
  );
};

export default PollDetailChart;

function YAxis({
  choices,
  onSelect,
}: {
  choices: Array<{ id: string; isSelected: boolean }>;
  onSelect: (id: string) => void;
}) {
  return (
    <div className={style.yaxis}>
      {choices.map((choice) => (
        <button
          key={choice.id}
          className={cn(
            style.y,
            'rounded-e bg-base-content/50 border-4 border-s-0 border-base-200',
            {
              'bg-secondary/80 border-2 border-s-0': choice.isSelected,
            }
          )}
          onClick={() => onSelect(choice.id)}
        ></button>
      ))}
    </div>
  );
}

function XAxis({
  selectedMbti,
  onSelect,
}: {
  selectedMbti: MBTI | null;
  onSelect: (id: MBTI) => void;
}) {
  return (
    <div className={style.xaxis}>
      {mbtis.map((mbti) => (
        <div
          key={mbti}
          className={cn(
            style.x,
            roboto.className,
            '!text-vertical flex-1 text-[10px] flex items-center opacity-70'
          )}
        >
          <button
            className={cn('rounded-sm py-0.5', {
              'bg-secondary font-bold opacity-100': selectedMbti === mbti,
              'opacity-30': selectedMbti && selectedMbti !== mbti,
            })}
            onClick={() => onSelect(mbti)}
          >
            {mbti}
          </button>
        </div>
      ))}
    </div>
  );
}
