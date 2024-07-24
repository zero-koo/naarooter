import { MBTI, Reaction } from './shared';

export type Post = {
  id: string;
  title: string;
  communityId: string | null;
  author: {
    id: string;
    name: string | null;
    mbti: MBTI | null;
    isMe: boolean;
  };
  description: string;
  type: PostType;
  images: string[];
  viewCount?: number;
  reaction: Reaction;
  createdAt: Date;
};

export type PostType = 'POST' | 'POLL';

export type PostInput = Pick<
  Post,
  'title' | 'communityId' | 'description' | 'images'
>;
