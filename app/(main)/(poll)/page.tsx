import RootHeader from '@/components/RootHeader';
import PollList from '@/components/poll/PollList';

export default function PollsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <>
      <RootHeader />
      <PollList searchKeyword={searchParams?.search} />
    </>
  );
}
