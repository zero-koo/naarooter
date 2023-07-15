export type Quiz = {
  title: string;
  description: string;
  choices: QuizChoice[];
  explanation: string;
  answer: string;
};

export type QuizChoice = {
  main: string;
  sub: string;
};
