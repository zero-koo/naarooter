import { Prisma } from '@prisma/client';

import {
  getDefaultPostSelect,
  PostCreateParams,
  PostRepositoryPayload,
  PostUpdateParams,
} from '../post/post.repository.type';
import { PostID } from '../post/post.type';
import { UserID } from '../user/user.type';

export const getDefaultPollSelect = (userId?: UserID) =>
  Prisma.validator<Prisma.PollSelect>()({
    id: true,
    post: {
      select: getDefaultPostSelect(userId),
    },
    choices: {
      select: {
        id: true,
        _count: {
          select: {
            votes: true,
          },
        },
        main: true,
        imageUrl: true,
        index: true,
      },
    },
    votes: {
      select: {
        pollChoiceId: true,
      },
      where: {
        authorId: userId,
      },
    },
  });

type PollChoicePrismaPayload = Prisma.PollChoiceGetPayload<{
  select: {
    id: true;
    main: true;
    index: true;
    imageUrl: true;
  };
}>;

export type PollPrismaPayload = Prisma.PollGetPayload<{
  select: ReturnType<typeof getDefaultPollSelect>;
}>;

export type PollRepositoryPayload = {
  id: PollPrismaPayload['id'];
  post: PostRepositoryPayload;
  choices: PollChoiceRepositoryPayload[];
};

export type PollChoiceRepositoryPayload = {
  id: PollChoicePrismaPayload['id'];
  index: PollChoicePrismaPayload['index'];
  main: PollChoicePrismaPayload['main'];
  imageUrl: PollChoicePrismaPayload['imageUrl'];
  voteCount: number;
  isVoted: boolean;
};

export type PollListGetParams = {
  communityId?: string;
  userId: UserID | null;
  authorId?: string;
  search?: string;
  limit?: number;
  lastId?: PostID;
  sortOrder?: 'asc' | 'desc';
};

export type PollCreateParams = PostCreateParams & {
  choices: Array<{
    index: PollChoicePrismaPayload['index'];
    main: PollChoicePrismaPayload['main'];
    imageUrl?: PollChoicePrismaPayload['imageUrl'];
  }>;
};

export type PollUpdateParams = PostUpdateParams & {
  userId: UserID;
};
