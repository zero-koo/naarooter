export type PollInput = {
  title: string;
  description?: string;
  choices: PollChoiceInput[];
};

export type Poll = PollInput & {
  id: string;
  submittedAnswer: string | null;
};

export type PollChoiceInput = {
  main: string;
  sub?: string;
};

export type PollChoice = PollChoiceInput & {
  voteCount: number;
};
