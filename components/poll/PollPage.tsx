'use client';

import { pollAPI } from '@/apis/poll.api';
import { useQuery } from '@tanstack/react-query';
import PollSubmitForm from './PollSubmitForm';

interface PollPageProps {
  id: string;
}

export default function PollPage({ id }: PollPageProps) {
  const { data: poll } = useQuery({
    queryKey: ['poll'],
    queryFn: () => pollAPI.byId(id),
  });
  return <div>{poll ? <PollSubmitForm {...poll} /> : <div>loading</div>}</div>;
}
