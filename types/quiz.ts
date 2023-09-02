export type QuizInput = {
  title: string;
  description?: string;
  choices: QuizChoice[];
  explanation?: string;
  answer: string;
};

export type Quiz = QuizInput & {
  id: string;
  submittedAnswer: string | null;
};

export type QuizChoice = {
  main: string;
  sub?: string;
};
