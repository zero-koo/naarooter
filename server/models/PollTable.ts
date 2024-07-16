import * as d3 from 'd3';

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
  constructor(
    private rows: PollTableRow[],
    private choices: string[]
  ) {}

  get countByChoiceToMBTI() {
    return d3.rollup(
      this.rows,
      (v) => v.length,
      (r) => r.choiceId,
      (r) => r.mbti
    );
  }

  get maxCountByChoiceToMBTI(): number {
    return (
      d3.max(this.countByChoiceToMBTI.values(), (row) =>
        d3.max(row.values())
      ) ?? 0
    );
  }
}
