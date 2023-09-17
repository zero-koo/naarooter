export type PollInput = {
  title: string;
  description?: string;
  choices: PollChoiceInput[];
};

export type Poll = {
  id: string;
  title: string;
  description?: string;
  submittedAnswerIndex: number | null;
  choices: PollChoice[];
};

export type PollChoiceInput = {
  main: string;
  sub?: string;
};

export type PollChoice = PollChoiceInput & {
  voteCount: number;
};
