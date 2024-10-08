import { COMMENT_STATUS } from '@prisma/client';

import { mbtis } from '@/lib/constants';

// REACT | NEXT
export type NextPage = ({
  params,
  searchParams,
}: {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}) => React.ReactNode;

// MBTI
export type MBTI = (typeof mbtis)[number];

// COMMENT
export type TComment = {
  id: number;
  content: string;
  authorId: string;
  authorName: string | null;
  authorMBTI: MBTI | null;
  createdAt: Date;
  updatedAt: Date;
  parentCommentId: number | null;
  comments: TComment[] | undefined;
  commentsCount: number;
  likeCount: number;
  dislikeCount: number;
  selectedReaction: UserReaction | undefined;
  status: COMMENT_STATUS;
  targetUserId?: string;
  targetUserName?: string | null;
};

export type TReply = Omit<TComment, 'parentCommentId'> & {
  parentCommentId: number;
};

export type CommentContent = string;

// reaction
export type UserReaction = 'like' | 'dislike' | null | undefined;
export type Reaction = {
  likeCount: number;
  dislikeCount: number;
  selectedReaction: UserReaction;
};
