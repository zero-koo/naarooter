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

type MBTI = (typeof mbtis)[number];

type PollTableRow = {
  choiceId: string;
  mbti: MBTI;
};

export class PollTable {
  constructor(private rows: PollTableRow[], private choices: string[]) {}

  get countByChoiceToMBTI(): Record<string, Record<MBTI, number>> {
    return this.rows.reduce(
      (matrix, { choiceId, mbti }) => {
        matrix[choiceId][mbti] += 1;
        return matrix;
      },
      this.choices.reduce((matrix, choice) => {
        matrix[choice] = mbtis.reduce((map, mbti) => {
          map[mbti] = 0;
          return map;
        }, {} as Record<MBTI, number>);

        return matrix;
      }, {} as Record<string, Record<MBTI, number>>)
    );
  }
}
