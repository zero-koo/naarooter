import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import ChartCellPopover from './ChartCellPopover';
import style from './PollDetailChart.module.css';

type HorizontalBarChartProps = {
  data: Array<{
    count: number;
    text: string;
  }>;
  choice: string;
  maxCount: number;
};

const VerticalBarChart = ({
  data,
  choice,
  maxCount,
}: HorizontalBarChartProps) => {
  const [cols, setCols] = useState(
    data.map(({ text }) => {
      return {
        count: 0,
        countRatio: 0,
        text,
      };
    })
  );

  useEffect(() => {
    setCols(
      data.map(({ count, text }) => {
        return {
          count,
          countRatio: maxCount === 0 ? 0 : (count / maxCount) * 100,
          text,
        };
      })
    );
  }, [data, maxCount]);

  return (
    <div className={style.cols}>
      {cols.map(({ count, countRatio, text }, index) => (
        <div
          key={index}
          className={cn(style.col, 'flex items-end justify-center')}
        >
          <ChartCellPopover
            className="bg-primary w-2/3 rounded-md transition-all"
            mbti={text}
            side="top"
            choice={choice}
            count={count}
            style={{ height: `${countRatio}%` }}
            sideOffset={3}
            alignOffset={-5}
          >
            <div style={{ height: `${countRatio}%` }}></div>
          </ChartCellPopover>
        </div>
      ))}
    </div>
  );
};

export default VerticalBarChart;
