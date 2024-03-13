const ChartCell = ({ opacity = 1 }: { opacity?: number }) => {
  return (
    <>
      <div className="z-0 w-full rounded bg-base-100 pb-[100%]"></div>
      <div
        className="absolute z-10 h-full w-full rounded bg-primary hover:bg-primary-focus"
        style={{
          opacity,
        }}
      ></div>
    </>
  );
};

export default ChartCell;
