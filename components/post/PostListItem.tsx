import { formatTimeAgo } from '@/lib/utils';
import { MessageCircleIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import Link from 'next/link';

interface PostListItemProps {
  id: string;
  title: string;
  authorName: string;
  description: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  listGroupId?: string;
}

const PostListItem = ({
  id,
  title,
  authorName,
  viewCount,
  likeCount,
  commentCount,
  createdAt,
  listGroupId,
}: PostListItemProps) => {
  return (
    <Link
      href={{
        pathname: `/posts/${id}`,
        query: { groupId: listGroupId },
      }}
    >
      <div
        className={
          'flex flex-col gap-1 border-b border-neutral-content/30 pb-3 pt-2.5'
        }
      >
        <div className="font-semibold">{title}</div>
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
