import { TPoll } from '@/types/poll';

export const pollFixture: TPoll = {
  id: '123',
  title: '혈액형 vs MBTI',
  description: '과연 혈액형은 성격과 상관관계가 있을까?',
  choices: [
    {
      id: '1',
      index: 0,
      main: 'A형',
      voteCount: 10,
      voted: false,
    },
    {
      id: '2',
      index: 1,
      main: 'B형',
      voteCount: 20,
      voted: false,
    },
    {
      id: '3',
      index: 2,
      main: 'O형',
      voteCount: 15,
      voted: false,
    },
    {
      id: '4',
      index: 3,
      main: 'AB형',
      voteCount: 5,
      voted: false,
    },
  ],
};
