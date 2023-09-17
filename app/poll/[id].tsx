interface PollPageProps {
  id: string;
}

export default function PollPage({ id }: PollPageProps) {
  return <div>{id}</div>;
}
