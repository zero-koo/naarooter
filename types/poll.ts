import { Post } from './post';

export type PollInput = {
  title: string;
  communityId?: string;
  description?: string;
  choices: PollChoiceInput[];
};

export type TPoll = {
  id: string;
  title: string;
  description: string;
  choices: PollChoice[];
  voteId?: number;
};

export type PollChoiceInput = {
  main: string;
  image?: File;
};

export type PollChoice = PollChoiceInput & {
  id: string;
  index: number;
  voteCount: number;
  voted: boolean;
};

export type Poll = Post & {
  pollId: string;
  choices: PollChoice[];
  voted: boolean;
};
