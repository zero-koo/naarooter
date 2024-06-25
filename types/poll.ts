export type PollInput = {
  title: string;
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
