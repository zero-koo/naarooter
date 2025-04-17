import PollPage from '@/components/poll/PollPage';

interface PollPageProps {
  params: {
    id: string;
  };
}

export default function Poll({ params }: PollPageProps) {
  return <PollPage postId={params.id} />;
}
