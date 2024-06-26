import { formatTimeAgo } from '@/lib/utils';
import { MBTI } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  MoreVerticalIcon,
  PencilIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Trash2Icon,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/AlertDialog';
import Link from 'next/link';
import { trpc } from '@/client/trpcClient';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import React from 'react';
import TextViewer from '../text-editor/TextViewer';

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
  like: {
    count: number;
    selected: boolean;
  };
  dislike: {
    count: number;
    selected: boolean;
  };
  onClickLike: ({ isCancel }: { isCancel: boolean }) => void;
  onClickDislike: ({ isCancel }: { isCancel: boolean }) => void;
}

const PostShowComponent = ({
  groupId,
  id,
  title,
  description,
  author,
  isAuthor,
  createdAt,
  viewCount,
  like,
  dislike,
  onClickLike,
  onClickDislike,
}: PostShowComponentProps) => {
  return (
    <div className="py-2">
      <div className="px-3 py-2">
        <div className="flex items-start py-1">
          <div className="text-lg font-semibold">{title}</div>
          {isAuthor && <PostShowUserMenu postId={id} postGroupId={groupId} />}
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
            <div>{`조회 ${viewCount.toLocaleString()}`}</div>
          </div>
        </div>
      </div>
      <div className="flex min-h-[100px] text-sm">
        <TextViewer initialValue={description} />
      </div>
      <div className="flex py-1">
        <div className="ml-auto flex gap-3 text-xs opacity-80">
          <div className="flex items-center gap-1">
            <ThumbsUpIcon
              size={12}
              fill={like.selected ? 'currentColor' : 'transparent'}
              onClick={() =>
                onClickLike({
                  isCancel: like.selected,
                })
              }
            />
            <div>{like.count}</div>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDownIcon
              size={12}
              fill={dislike.selected ? 'currentColor' : 'transparent'}
              onClick={() =>
                onClickDislike({
                  isCancel: dislike.selected,
                })
              }
            />
            <div>{dislike.count}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShowComponent;

interface PostShowUserMenuProps {
  postId: string;
  postGroupId: string | null;
}

const PostShowUserMenu = React.memo(
  ({ postId, postGroupId }: PostShowUserMenuProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const { mutate: deletePost } = trpc.post.delete.useMutation({
      onSuccess() {
        router.replace(`/post/posts/${postGroupId ?? 'all'}`);
      },
      onError() {
        toast.update({
          theme: 'error',
          message: '글이 삭제되지 않았습니다. 잠시 후 다시 시도해주세요.',
        });
      },
    });
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="my-0.5 ml-auto rounded-lg p-1 hover:bg-slate-500"
        >
          <MoreVerticalIcon size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-18 min-w-0 border-base-content/10 bg-base-100 text-xs text-primary-content"
          collisionPadding={8}
          align="end"
        >
          <DropdownMenuItem className="flex items-center justify-between gap-2 p-1 py-1.5 opacity-70">
            <PencilIcon size={14} />
            <Link href={`/posts/${postId}/edit`}>수정</Link>
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="flex items-center justify-between gap-2 p-1 py-1.5 opacity-70"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2Icon size={14} />
                <div>삭제</div>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
                <AlertDialogDescription>
                  댓글을 완전히 삭제할까요?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant={'destructive'}
                  onClick={() => deletePost({ id: postId })}
                >
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

PostShowUserMenu.displayName = 'PostShowUserMenu';
