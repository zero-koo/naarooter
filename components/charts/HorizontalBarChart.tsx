import { cn } from '@/lib/utils';
import style from './PollDetailChart.module.css';
import ChartCellPopover from './ChartCellPopover';
import { MBTI } from '@/types/shared';
import { useEffect, useState } from 'react';

type HorizontalBarChartProps = {
  data: Array<{
    count: number;
    text: string;
  }>;
  mbti: MBTI;
  maxCount: number;
};

const HorizontalBarChart = ({
  data,
  mbti,
  maxCount,
}: HorizontalBarChartProps) => {
  const [rows, setRows] = useState(
    data.map(({ text }) => {
      return {
        count: 0,
        countRatio: 0,
        text,
      };
    })
  );

  useEffect(() => {
    setRows(
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
    <div className={style.rows}>
      {rows.map(({ count, countRatio, text }, index) => (
        <div
          key={index}
          className={cn(style.row, 'flex items-center w-full h-full')}
        >
          <ChartCellPopover
            className="h-2/3 rounded bg-primary/70 transition-all"
            mbti={mbti}
            choice={text}
            count={count}
            style={{ width: `${countRatio}%` }}
            align="end"
            sideOffset={-25}
          >
            <div style={{ width: `${countRatio}%` }}></div>
          </ChartCellPopover>
        </div>
      ))}
    </div>
  );
};

export default HorizontalBarChart;
