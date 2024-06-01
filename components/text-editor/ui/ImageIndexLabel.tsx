export const ImageIndexLabel = ({
  index,
  subIndex,
}: {
  index: number;
  subIndex?: number;
}) => {
  return (
    <div
      className={
        'flex-center absolute right-1 top-1 h-[18px] min-w-[18px] select-none rounded bg-neutral-900/80 px-1 py-0.5 text-xxs text-white'
      }
    >
      {`${index + 1}${subIndex !== undefined ? `-${subIndex + 1}` : ''}`}
    </div>
  );
};
