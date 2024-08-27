import { prisma } from '@/server/prisma';
import { PrismaClient } from '@prisma/client';

import { PostRepository } from '../post/post.repository';
import { PostID } from '../post/post.type';
import { UserID } from '../user/user.type';
import {
  getDefaultPollSelect,
  PollChoiceRepositoryPayload,
  PollCreateParams,
  PollListGetParams,
  PollPrismaPayload,
  PollRepositoryPayload,
  PollUpdateParams,
} from './poll.repository.type';

export interface IPollRepository {
  getByPollId(params: {
    pollId: PollRepositoryPayload['id'];
    userId: UserID | null;
  }): Promise<PollRepositoryPayload | null>;
  getByPostId(params: {
    postId: PostID;
    userId: UserID | null;
  }): Promise<PollRepositoryPayload | null>;
  getSelectedChoice(params: {
    postId: PostID;
    userId: UserID;
  }): Promise<PollChoiceRepositoryPayload['id'] | null>;
  list(params: PollListGetParams): Promise<PollRepositoryPayload[]>;
  create(params: PollCreateParams): Promise<PollRepositoryPayload>;
  update(params: PollUpdateParams): Promise<PollRepositoryPayload>;
  delete(postId: PostID): Promise<void>;
}

class PollRepository implements IPollRepository {
  constructor(private db: PrismaClient) {}

  static payloadToPoll(
    payload: PollPrismaPayload,
    userId: UserID | null
  ): PollRepositoryPayload {
    const { id, post, choices, votes } = payload;

    return {
      id,
      post: PostRepository.payloadToPost(post, userId),
      choices: choices.map((choice) => {
        return {
          id: choice.id,
          index: choice.index,
          main: choice.main,
          imageUrl: choice.imageUrl,
          voteCount: choice._count.votes,
          isVoted: votes[0]?.pollChoiceId === choice.id,
        };
      }),
    };
  }

  public async getByPostId({
    postId,
    userId,
  }: {
    postId: PostID;
    userId: UserID | null;
  }): Promise<PollRepositoryPayload | null> {
    const pollPayload = await this.db.poll.findUnique({
      select: getDefaultPollSelect(userId ?? undefined),
      where: {
        postId,
      },
    });

    return pollPayload && PollRepository.payloadToPoll(pollPayload, userId);
  }

  public async getByPollId({
    pollId,
    userId,
  }: {
    pollId: PollRepositoryPayload['id'];
    userId: UserID | null;
  }): Promise<PollRepositoryPayload | null> {
    const pollPayload = await this.db.poll.findUnique({
      select: getDefaultPollSelect(userId ?? undefined),
      where: {
        id: pollId,
      },
    });

    return pollPayload && PollRepository.payloadToPoll(pollPayload, userId);
  }

  public async getSelectedChoice({
    postId,
    userId,
  }: {
    postId: PostID;
    userId: UserID;
  }): Promise<PollChoiceRepositoryPayload['id'] | null> {
    const vote = await this.db.vote.findFirst({
      where: {
        authorId: userId,
        poll: {
          postId,
        },
      },
    });

    return vote?.pollChoiceId ?? null;
  }

  public async list({
    userId,
    communityId,
    cursorId,
    limit = 10,
    search,
    sortOrder,
  }: PollListGetParams): Promise<PollRepositoryPayload[]> {
    const pollsPayload = await this.db.poll.findMany({
      select: getDefaultPollSelect(userId ?? undefined),
      take: limit + 1,
      where: {
        post: {
          communityId: communityId,
          AND: search?.split(' ').map((keyword) => ({
            title: {
              contains: keyword,
              mode: 'insensitive',
            },
          })),
        },
      },
      cursor: cursorId
        ? {
            postId: cursorId,
          }
        : undefined,
      orderBy: {
        post: {
          createdAt: sortOrder,
        },
      },
    });
    return pollsPayload.map((payload) =>
      PollRepository.payloadToPoll(payload, userId)
    );
  }

  public async create({
    authorId: userId,
    communityId,
    title,
    description,
    images,
    choices,
  }: PollCreateParams): Promise<PollRepositoryPayload> {
    const pollPayload = await this.db.poll.create({
      select: getDefaultPollSelect(userId ?? undefined),
      data: {
        post: {
          create: {
            title,
            communityId: communityId,
            description,
            images,
            type: 'POLL',
            authorId: userId,
          },
        },
        choices: {
          create: choices,
        },
      },
    });

    return PollRepository.payloadToPoll(pollPayload, userId);
  }

  public async update({
    userId,
    title,
    postId,
    description,
    images,
  }: PollUpdateParams): Promise<PollRepositoryPayload> {
    // TODO:
    // choices update
    const pollPayload = await this.db.poll.update({
      select: getDefaultPollSelect(userId),
      where: {
        postId,
      },
      data: {
        post: {
          update: {
            title,
            description,
            images,
          },
        },
      },
    });
    return PollRepository.payloadToPoll(pollPayload, userId);
  }

  public async delete(postId: PostID): Promise<void> {
    await this.db.poll.delete({
      where: {
        postId,
      },
      include: {
        post: true,
        votes: true,
        choices: true,
      },
    });
  }
}

export const pollRepository = new PollRepository(prisma);
