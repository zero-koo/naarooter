import { TRPCError } from '@trpc/server';

import { IPollRepository, pollRepository } from '../poll/poll.repository';
import { TPoll, TPollChoice } from '../poll/poll.type';
import { UserID } from '../user/user.type';
import { IVoteRepository, voteRepository } from './vote.repository';

export interface IVoteService {
  vote(params: {
    pollId: TPoll['id'];
    userId: UserID;
    pollChoiceId: TPollChoice['id'] | null;
  }): Promise<{ pollChoiceId: TPollChoice['id'] } | void>;
}

class VoteService implements IVoteService {
  constructor(
    private pollRepository: IPollRepository,
    private voteRepository: IVoteRepository
  ) {}

  public async vote({
    pollId,
    userId,
    pollChoiceId,
  }: {
    pollId: TPoll['id'];
    userId: UserID;
    pollChoiceId: TPollChoice['id'] | null;
  }) {
    const poll = this.pollRepository.getByPollId({ pollId, userId });
    if (!poll) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No poll with id '${pollId}'`,
      });
    }
    return await this.voteRepository.upsert({
      pollId,
      userId,
      pollChoiceId,
    });
  }
}

export const voteService = new VoteService(pollRepository, voteRepository);
