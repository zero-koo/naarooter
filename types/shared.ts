import { mbtis } from '@/lib/constants';
import { COMMENT_STATUS } from '@prisma/client';

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
  parentCommentId: number | undefined;
  comments: TComment[] | undefined;
  commentsCount: number;
  likeCount: number;
  dislikeCount: number;
  userReaction: UserReaction;
  status: COMMENT_STATUS;
  targetUserId?: string;
  targetUserName?: string | null;
};

export type TReply = Omit<TComment, 'parentCommentId'> & {
  parentCommentId: number;
};

export type CommentContent = string;

// reaction
export type UserReaction = 'like' | 'dislike' | null;
export type Reaction = {
  likeCount: number;
  dislikeCount: number;
  userReaction: UserReaction;
};
