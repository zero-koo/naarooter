import { prisma } from '@/server/prisma';
import { MBTI, PrismaClient } from '@prisma/client';

import { TPoll, TPollChoice } from '../poll/poll.type';
import { UserID } from '../user/user.type';

export interface IVoteRepository {
  listByPollId(pollId: TPoll['id']): Promise<
    Array<{
      userMBTI: MBTI | null;
      choiceId: TPollChoice['id'];
    }>
  >;
  getSelectedChoice(params: {
    pollId: TPoll['id'];
    userId: UserID;
  }): Promise<TPollChoice['id'] | null>;
  upsert(params: {
    pollId: TPoll['id'];
    userId: UserID;
    pollChoiceId: TPollChoice['id'] | null;
  }): Promise<{ pollChoiceId: TPollChoice['id'] } | void>;
}

class VoteRepository implements IVoteRepository {
  constructor(private db: PrismaClient) {}

  public async listByPollId(pollId: TPoll['id']): Promise<
    Array<{
      userMBTI: MBTI | null;
      choiceId: TPollChoice['id'];
    }>
  > {
    const data = await this.db.vote.findMany({
      select: {
        pollChoiceId: true,
        poll: {
          select: {
            post: {
              select: {
                author: {
                  select: {
                    mbti: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        pollId,
      },
    });

    return data.map((d) => ({
      choiceId: d.pollChoiceId,
      userMBTI: d.poll.post.author.mbti,
    }));
  }

  public async getSelectedChoice({
    pollId,
    userId,
  }: {
    pollId: TPoll['id'];
    userId: UserID;
  }): Promise<TPollChoice['id'] | null> {
    const vote = await this.db.vote.findFirst({
      where: {
        authorId: userId,
        pollId,
      },
    });

    return vote?.pollChoiceId ?? null;
  }

  public async upsert({
    pollId,
    userId,
    pollChoiceId,
  }: {
    pollId: TPoll['id'];
    userId: UserID;
    pollChoiceId: TPollChoice['id'] | null;
  }): Promise<{ pollChoiceId: TPollChoice['id'] } | void> {
    await this.db.vote.deleteMany({
      where: {
        pollId,
        authorId: userId,
      },
    });

    if (!pollChoiceId) return;

    return await this.db.vote.create({
      data: {
        authorId: userId,
        pollId,
        pollChoiceId,
      },
    });
  }
}

export const voteRepository = new VoteRepository(prisma);
