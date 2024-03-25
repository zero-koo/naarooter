import CommunityHeader from '@/components/CommunityHeader';
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
      <CommunityHeader title={'설문조사'} />
      <PollList searchKeyword={searchParams?.search} />
    </>
  );
}
