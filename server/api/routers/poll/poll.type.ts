import { MBTI } from '@/types/shared';

import { Post, PostID } from '../post/post.type';
import { UserID } from '../user/user.type';
import {
  PollChoiceRepositoryPayload,
  PollCreateParams as PollRepositoryCreateParams,
  PollRepositoryPayload,
  PollUpdateParams as PollRepositoryUpdateParams,
} from './poll.repository.type';

export type TPoll = {
  id: PollRepositoryPayload['id'];
  post: Post;
  choices: TPollChoice[];
};

export type PollID = TPoll['id'];

export type TPollChoice = {
  id: PollChoiceRepositoryPayload['id'];
  index: PollChoiceRepositoryPayload['index'];
  main: PollChoiceRepositoryPayload['main'];
  imageUrl: PollChoiceRepositoryPayload['imageUrl'];
  voteCount: number;
  isVoted: boolean;
};

export type TPollDetail = {
  id: TPoll['id'];
  choices: Map<TPollChoice['id'], Map<MBTI, number>>;
  maxCount: number;
  totalCount: number;
};

export type PollListParams = {
  userId: UserID | null;
  authorId?: UserID;
  communityId?: string;
  search?: string;
  limit?: number;
  cursorId?: PostID;
  sortOrder?: 'asc' | 'desc';
};

export type PollCreateParams = {
  input: PollRepositoryCreateParams;
  userId: UserID;
};

export type PollUpdateParams = {
  input: Omit<PollRepositoryUpdateParams, 'userId'>;
  userId: UserID;
};
