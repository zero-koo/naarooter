import { PollTable } from '@/server/models/PollTable';
import { MBTI } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { PostService } from '../post/post.service';
import { PostID } from '../post/post.type';
import { UserID } from '../user/user.type';
import { IVoteRepository, voteRepository } from '../vote/vote.repository';
import { IPollRepository, pollRepository } from './poll.repository';
import { PollRepositoryPayload } from './poll.repository.type';
import {
  PollCreateParams,
  PollListParams,
  PollUpdateParams,
  TPoll,
  TPollDetail,
} from './poll.type';

export interface IPollService {
  getByPostId(params: {
    postId: PostID;
    userId: UserID | null;
  }): Promise<TPoll>;
  getDetailByPollId(params: {
    pollId: TPoll['id'];
    userId: UserID;
  }): Promise<TPollDetail>;
  list(params: PollListParams): Promise<TPoll[]>;
  create(parmas: PollCreateParams): Promise<TPoll>;
  update(params: PollUpdateParams): Promise<TPoll>;
  delete(params: { postId: PostID; userId: UserID }): Promise<void>;
}

class PollService implements IPollService {
  constructor(
    private pollRepository: IPollRepository,
    private voteRepository: IVoteRepository
  ) {}

  public static repositoryPayloadToPoll(
    payload: PollRepositoryPayload,
    userId: UserID | null
  ): TPoll {
    return {
      ...payload,
      post: PostService.repositoryPayloadToPost(payload.post, userId),
    };
  }

  public async getByPostId({
    postId,
    userId,
  }: {
    postId: PostID;
    userId: UserID | null;
  }): Promise<TPoll> {
    const pollPayload = await this.pollRepository.getByPostId({
      postId,
      userId,
    });
    if (!pollPayload) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${postId}'`,
      });
    }
    return PollService.repositoryPayloadToPoll(pollPayload, userId);
  }

  public async list(params: PollListParams): Promise<TPoll[]> {
    const pollsPayload = await this.pollRepository.list(params);
    return pollsPayload.map((payload) =>
      PollService.repositoryPayloadToPoll(payload, params.userId)
    );
  }

  public async getDetailByPollId({
    pollId,
    userId,
  }: {
    pollId: TPoll['id'];
    userId: UserID;
  }): Promise<TPollDetail> {
    const poll = await this.pollRepository.getByPollId({
      pollId,
      userId,
    });

    if (!poll) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No poll with id '${pollId}'`,
      });
    }

    const votes = await this.voteRepository.listByPollId(pollId);
    console.log({ votes });

    const pollTable = new PollTable(
      votes
        .filter((v) => !!v.userMBTI)
        .map((v) => ({ mbti: v.userMBTI as MBTI, choiceId: v.choiceId })),
      poll.choices.map((c) => c.id)
    );

    return {
      id: poll.post.id,
      choices: pollTable.countByChoiceToMBTI,
      maxCount: pollTable.maxCountByChoiceToMBTI,
      totalCount: votes.length,
    };
  }

  public async create(params: PollCreateParams): Promise<TPoll> {
    const pollPayload = await this.pollRepository.create(params.input);
    return PollService.repositoryPayloadToPoll(pollPayload, params.userId);
  }

  public async update({ input, userId }: PollUpdateParams): Promise<TPoll> {
    const post = await this.pollRepository.getByPostId({
      postId: input.postId,
      userId,
    });
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${input.postId}'`,
      });
    }
    if (post.post.author.id !== userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
    const pollPayload = await this.pollRepository.update({ ...input, userId });
    return PollService.repositoryPayloadToPoll(pollPayload, userId);
  }

  public async delete({
    postId,
    userId,
  }: {
    postId: PostID;
    userId: UserID;
  }): Promise<void> {
    const post = await this.pollRepository.getByPostId({
      postId,
      userId,
    });
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${postId}'`,
      });
    }

    await this.pollRepository.delete(postId);
  }
}

export const pollService = new PollService(pollRepository, voteRepository);
