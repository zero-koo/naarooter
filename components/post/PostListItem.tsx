import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PostType } from '@prisma/client';
import { MessageCircleIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import { formatTimeAgo } from '@/lib/utils';

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
  communityId?: string;
}

const PostListItem = ({
  id,
  title,
  authorName,
  postType,
  likeCount,
  commentCount,
  createdAt,
}: PostListItemProps) => {
  const pathName = usePathname();
  return (
    <Link
      href={`${pathName === '/' ? '' : pathName}/${postType === 'POLL' ? 'poll' : 'post'}/${id}`}
      className="group"
    >
      <div
        className={
          'border-neutral-content/10 bg-base-100 flex flex-col gap-1 border-b px-2 pb-3 pt-2.5 group-last:border-none md:px-3 md:group-first:rounded-t-lg md:group-last:rounded-b-lg'
        }
      >
        <div className="flex items-center font-semibold">
          {postType !== 'POST' && (
            <div className="bg-primary/50 mr-1.5 rounded-md px-1.5 text-sm">
              {postType}
            </div>
          )}
          <div>{title}</div>
        </div>
        <div className="text-foreground-dim flex justify-between text-xs">
          <div className="flex">
            <div>{authorName}</div>
            <div className={'mx-0.5'}>·</div>
            <div>{formatTimeAgo(createdAt)}</div>
          </div>
          <div className="flex items-center gap-3">
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
