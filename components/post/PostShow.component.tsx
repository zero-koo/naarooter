import { formatTimeAgo } from '@/lib/utils';
import { MBTI } from '@prisma/client';
import { TextViewer } from '../text-viewer';

interface PostShowComponentProps {
  id: string;
  title: string;
  description: string;
  author?: {
    id: string;
    name: string;
    mbti: MBTI | null;
  };
  createdAt: Date;
}

const PostShowComponent = ({
  title,
  description,
  author,
  createdAt,
}: PostShowComponentProps) => {
  return (
    <div className="p-3">
      <div className="py-1 text-lg font-semibold">{title}</div>
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
          <div>{`조회 ${10}`}</div>
        </div>
      </div>
      <div className="flex min-h-[100px] py-2 text-sm">
        <TextViewer
          content={JSON.parse(description)}
          containerClass="opacity-80"
        />
      </div>
    </div>
  );
};

export default PostShowComponent;
