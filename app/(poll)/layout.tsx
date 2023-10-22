import RootHeader from '@/components/RootHeader';

const PollLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RootHeader />
      {children}
    </>
  );
};

export default PollLayout;
