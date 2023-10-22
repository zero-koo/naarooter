import { PollChoice, TPoll } from '@/types/poll';

export class Poll implements TPoll {
  id: string;
  title: string;
  description: string;
  choices: PollChoice[];
  voteId?: number;

  constructor({ id, title, description, choices, voteId }: TPoll) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.choices = choices;
    this.voteId = voteId;
  }

  vote(choiceId: string) {
    const choice = this.choices.find((choice) => choice.id === choiceId);
    const isVotedChoice = !!choice?.voted;

    if (!choice) {
      throw ReferenceError(`The choice of id: ${choiceId} does not exist!`);
    }

    if (this.votedChoice) {
      this.votedChoice.voteCount--;
      this.votedChoice.voted = false;
    }

    if (isVotedChoice) return;
    choice.voteCount++;
    choice.voted = true;
  }

  get votedChoice(): PollChoice | null {
    return this.choices.find((choice) => choice.voted) ?? null;
  }

  get votedChoiceId(): string | null {
    return this.votedChoice?.id ?? null;
  }

  get isVoted(): boolean {
    return this.votedChoiceId !== null;
  }
}
