export type PollInput = {
  title: string;
  description: string;
  choices: PollChoiceInput[];
};

export type Poll = {
  id: string;
  title: string;
  description: string;
  choices: PollChoice[];
};

export type PollChoiceInput = {
  main: string;
  sub: string;
};

export type PollChoice = PollChoiceInput & {
  id: string;
  index: number;
  voteCount: number;
  voted: boolean;
};
