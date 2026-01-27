import { CSSProperties, useState } from 'react';
import { Roboto_Mono } from 'next/font/google';
import { MBTI } from '@/types/shared';
import * as d3 from 'd3';

import { mbtis } from '@/lib/constants';
import { cn } from '@/lib/utils';

import ChartCell from './ChartCell';
import ChartCellPopover from './ChartCellPopover';
import HorizontalBarChart from './HorizontalBarChart';
import style from './PollDetailChart.module.css';
import VerticalBarChart from './VerticalBarChart';

type PollDetailChartProps = {
  choices: Array<{
    id: string;
    text: string;
  }>;
  counts?: d3.InternMap<string, d3.InternMap<MBTI, number>>;
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
      count: selectedMbti ? counts?.get(choice.id)?.get(selectedMbti!) ?? 0 : 0,
    };
  });

  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const countsPerSelectedChoice = mbtis.map((mbti) => {
    return {
      text: mbti,
      count: selectedChoiceId
        ? counts?.get(selectedChoiceId)?.get(mbti) ?? 0
        : 0,
    };
  });

  return (
    <div className="flex flex-col">
      <div
        className={style.grid}
        style={{ '--rows': choices.length } as CSSProperties}
      >
        <div
          className={cn(style.bubble, {
            invisible: selectedMbti || selectedChoiceId,
          })}
        >
          {choices.map((choice, index) => (
            <div className={style.bubbleRow} key={index}>
              {mbtis.map((mbti) => {
                const count = counts?.get(choice.id)?.get(mbti) ?? 0;
                return (
                  <ChartCellPopover
                    key={mbti}
                    mbti={mbti}
                    choice={choices[index].text}
                    count={count}
                    className="flex flex-1 items-center justify-center"
                    alignOffset={-5}
                  >
                    <ChartCell
                      countRatio={count / (maxCount || 1)}
                      shape={'bubble'}
                    />
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
            'border-base-200 bg-foreground/50 rounded-e border-4 border-s-0',
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
            '!text-vertical flex flex-1 items-center text-[10px] opacity-70'
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
