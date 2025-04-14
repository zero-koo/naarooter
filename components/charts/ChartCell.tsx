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
        className={cn('z-0 w-full rounded-sm pb-[100%] md:rounded-md', {
          'bg-base-100': shape === 'grid',
        })}
      ></div>
      <div
        className={cn(
          'bg-primary hover:bg-primary-focus absolute z-10 h-full w-full rounded-sm md:rounded-md',
          {
            '!rounded-full': shape === 'bubble',
          }
        )}
        style={{
          opacity: countRatio,
          scale: shape === 'bubble' ? countRatio * 1.6 : 1,
        }}
      ></div>
    </>
  );
};

export default ChartCell;
