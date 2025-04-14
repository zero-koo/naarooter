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
        'flex-center text-xxs absolute right-1 top-1 h-[18px] min-w-[18px] select-none rounded-sm bg-neutral-900/80 px-1 py-0.5 text-white'
      }
    >
      {`${index + 1}${subIndex !== undefined ? `-${subIndex + 1}` : ''}`}
    </div>
  );
};
