import { usePostContext } from '@/contexts/PostContext';

import { formatTimeAgo } from '@/lib/utils';
import { usePostQuery } from '@/hooks/queries/usePostQuery';

import PostShowActionMenu from './PostShowActionMenu';

const PostShowHeaderContent = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { id } = usePostContext();
  const [{ title, author, createdAt, viewCount }] = usePostQuery(id);

  return (
    <div {...props}>
      <div className="flex items-start py-1">
        <div className="text-lg font-semibold">{title}</div>
        {author.isMe && <PostShowActionMenu />}
      </div>
      <div className="flex items-center justify-between text-xs opacity-70">
        {author && (
          <div className="flex py-1">
            <div>{author.mbti ?? 'UNKNOWN'}</div>
            <div className={'mx-0.5'}>·</div>
            <div>{author.name ?? '익명'}</div>
          </div>
        )}
        <div className="ml-auto flex">
          <div>{formatTimeAgo(createdAt)}</div>
          <div className={'mx-0.5'}>·</div>
          {viewCount !== undefined && (
            <div>{`조회 ${viewCount.toLocaleString()}`}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostShowHeaderContent;
