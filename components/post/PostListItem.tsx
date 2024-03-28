import { formatTimeAgo } from '@/lib/utils';
import { PostType } from '@prisma/client';
import { MessageCircleIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps } from 'react';

interface PostListItemProps {
  id: string;
  title: string;
  authorName: string;
  description: string;
  postType: PostType;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  listGroupId?: string;
}

const getLink = ({
  postType,
  id,
  listGroupId,
}: {
  postType: PostType;
  id: string;
  listGroupId?: string;
}): ComponentProps<typeof Link>['href'] => {
  switch (postType) {
    case 'POST': {
      return {
        pathname: `/posts/${id}`,
        ...(listGroupId && { query: { groupId: listGroupId } }),
      };
    }
    case 'POLL': {
      return {
        pathname: `/polls/${id}`,
      };
    }
  }
};

const PostListItem = ({
  id,
  title,
  authorName,
  postType,
  viewCount,
  likeCount,
  commentCount,
  createdAt,
  listGroupId,
}: PostListItemProps) => {
  return (
    <Link href={getLink({ postType, id, listGroupId })}>
      <div
        className={
          'flex flex-col gap-1 border-b border-neutral-content/30 pb-3 pt-2.5'
        }
      >
        <div className="flex items-center font-semibold">
          {postType !== 'POST' && (
            <div className="mr-1.5 rounded bg-primary/50 px-1.5 text-sm">
              {postType}
            </div>
          )}
          <div>{title}</div>
        </div>
        <div className="flex justify-between text-xs opacity-70">
          <div className="flex">
            <div>{authorName}</div>
            <div className={'mx-0.5'}>·</div>
            <div>{formatTimeAgo(createdAt)}</div>
            <div className={'mx-0.5'}>·</div>
            <div>{`조회 ${viewCount.toLocaleString()}`}</div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1">
              {likeCount >= 0 ? (
                <ThumbsUpIcon size={12} />
              ) : (
                <ThumbsDownIcon size={12} />
              )}
              <div>{Math.abs(likeCount)}</div>
            </div>
            <div className="flex items-center gap-0.5">
              <MessageCircleIcon size={12} />
              {commentCount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostListItem;
