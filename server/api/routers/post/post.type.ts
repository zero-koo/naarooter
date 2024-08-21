import { Reaction } from '@/types/shared';

import { User } from '../user/user.repository.type';
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
  userId: User['id'] | null;
  authorId?: User['id'];
  communityId?: string;
  search?: string;
  limit?: number;
  lastId?: Post['id'];
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
  input: { postId: Post['id'] } & Pick<
    PostRepositoryPayload,
    'title' | 'description' | 'images'
  >;
  userId: string;
};
