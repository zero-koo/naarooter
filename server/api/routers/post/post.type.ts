import { Reaction } from '@/types/shared';

import { UserID } from '../user/user.type';
import { PostRepositoryPayload } from './post.repository.type';

export type Post = Omit<
  PostRepositoryPayload,
  'author' | 'likeCount' | 'dislikeCount'
> & {
  author: PostRepositoryPayload['author'] & {
    isMe: boolean;
  };
  reaction: Reaction;
};

export type PostID = Post['id'];

export type PostType = 'POST' | 'POLL';

export type PostListParams = {
  userId: UserID | null;
  authorId?: UserID;
  communityId?: string;
  search?: string;
  limit?: number;
  lastId?: PostID;
  sortOrder?: 'asc' | 'desc';
};

export type PostCreateParams = {
  input: Pick<
    PostRepositoryPayload,
    'title' | 'communityId' | 'description' | 'images'
  >;
  userId: string;
};

export type PostUpdateParams = {
  input: { postId: PostID } & Pick<
    PostRepositoryPayload,
    'title' | 'description' | 'images'
  >;
  userId: string;
};
