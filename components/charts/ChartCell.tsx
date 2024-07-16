import { cn } from '@/lib/utils';

export type ChartCellShape = 'bubble' | 'grid';

const ChartCell = ({
  countRatio = 1,
  shape,
}: {
  countRatio?: number;
  shape: ChartCellShape;
}) => {
  return (
    <>
      <div
        className={cn('z-0 w-full rounded-sm pb-[100%] md:rounded', {
          'bg-base-100': shape === 'grid',
        })}
      ></div>
      <div
        className={cn(
          'absolute z-10 h-full w-full rounded-sm bg-primary hover:bg-primary-focus md:rounded',
          {
            '!rounded-full': shape === 'bubble',
          }
        )}
        style={{
          opacity: shape === 'bubble' ? countRatio * 0.3 + 0.3 : countRatio,
          scale: shape === 'bubble' ? countRatio * 1.6 : 1,
        }}
      ></div>
    </>
  );
};

export default ChartCell;
