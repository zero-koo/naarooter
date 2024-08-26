import React from 'react';
import { MBTI } from '@prisma/client';

import { formatTimeAgo } from '@/lib/utils';

import TextViewer from '../text-editor/TextViewer';
import GrayBox from '../ui/GrayBox';
import PostShowActionMenu from './PostShowActionMenu';

interface PostShowComponentProps {
  groupId: string | null;
  id: string;
  title: string;
  description: string;
  author?: {
    id: string;
    name: string | null;
    mbti: MBTI | null;
  };
  isAuthor: boolean;
  createdAt: Date;
  viewCount: number;
  footer?: React.ReactNode;
}

const PostShowComponent = ({
  title,
  description,
  author,
  isAuthor,
  createdAt,
  footer,
}: PostShowComponentProps) => {
  return (
    <div className="pb-2">
      <GrayBox className="px-3 py-2">
        <div className="flex items-start py-1">
          <div className="text-lg font-semibold">{title}</div>
          {isAuthor && <PostShowActionMenu />}
        </div>
        <div className="flex items-center justify-between text-xs opacity-70">
          {author && (
            <div className="flex py-1">
              <div>{author.name ?? '익명'}</div>
              {author.mbti && (
                <>
                  <div className={'mx-0.5'}>·</div>
                  <div>{author.mbti}</div>
                </>
              )}
            </div>
          )}
          <div className="ml-auto flex">
            <div>{formatTimeAgo(createdAt)}</div>
          </div>
        </div>
      </GrayBox>
      <div className="flex min-h-[100px] text-sm">
        <TextViewer value={description} />
      </div>
      {footer}
    </div>
  );
};

export default PostShowComponent;
