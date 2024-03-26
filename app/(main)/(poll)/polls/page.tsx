import DefaultListHeader from '@/components/DefaultListHeader';
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
      <DefaultListHeader title={'설문조사'} />
      <PollList searchKeyword={searchParams?.search} />
    </>
  );
}
