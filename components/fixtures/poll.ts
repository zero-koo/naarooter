import { Poll } from '@/types/poll';

export const pollFixture: Poll = {
  id: '123',
  title: '혈액형 vs MBTI',
  description: '과연 혈액형은 성격과 상관관계가 있을까?',
  choices: [
    {
      main: 'A형',
      sub: '소심',
      voteCount: 10,
    },
    {
      main: 'B형',
      sub: '다혈질',
      voteCount: 20,
    },
    {
      main: 'O형',
      voteCount: 15,
    },
    {
      main: 'AB형',
      sub: '싸이코',
      voteCount: 5,
    },
  ],
  submittedAnswerIndex: 0,
};
