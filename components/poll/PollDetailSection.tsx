import { usePollDetailQuery } from '@/hooks/queries/usePollDetailQuery';

const mbtis = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const;

const PollDetailSection = ({ id }: { id: string }) => {
  const { data } = usePollDetailQuery(id);
  if (!data) return <section>loading</section>;

  console.log(data);

  return <section>Detail</section>;
};

export default PollDetailSection;
