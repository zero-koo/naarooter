import { useState } from 'react';
import { api } from '@/trpc/react';
import { UserReaction } from '@/types/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { MBTI } from '@prisma/client';
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn, formatTimeAgo } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';

import { Button } from '../Button';
import LikeDislike from '../LikeDislike';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import TextArea from '../ui/TextArea';

interface PostCommentSectionComponentProps {
  comments: Comment[];
  totalCount: number;
  postAuthorId: string;
  userId?: string;
  onAdd: (data: { text: string }) => Promise<Comment>;
  onDelete: (data: { commentId: number }) => Promise<void>;
}

type Comment = {
  id: number;
  author: {
    id: string;
    mbti: MBTI | null;
    name: string | null;
  };
  text: string;
  children: Comment[];
  updatedAt: Date;
  like: number;
  dislike: number;
  reaction: 'like' | 'dislike' | null | undefined;
};

const PostCommentSectionComponent = ({
  comments,
  totalCount,
  postAuthorId,
  userId,
  onAdd,
  onDelete,
}: PostCommentSectionComponentProps) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [commentCount, setCommentCount] = useState<number>(totalCount);

  return (
    <section className="mt-2 bg-base-200 px-3 py-1">
      <div className="flex flex-col">
        <div className="py-2 font-semibold">{`댓글 ${commentCount}개`}</div>

        {userId && (
          <div className="mb-1 py-1">
            <PostCommentEdit
              hideButtonsByDefault
              onSave={async (text) => {
                const data = await onAdd({ text });
                setCommentList([data, ...commentList]);
                setCommentCount(commentCount + 1);
              }}
            />
          </div>
        )}
        <div className="text-xs">
          {commentList.map((comment) => (
            <PollComment
              key={comment.id}
              id={comment.id}
              text={comment.text}
              authorMbti={comment.author.mbti}
              authorName={comment.author.name}
              isMe={comment.author.id === userId}
              isAuthor={comment.author.id === postAuthorId}
              updatedAt={comment.updatedAt}
              like={comment.like}
              dislike={comment.dislike}
              reaction={comment.reaction}
              onDelete={async () => {
                await onDelete({ commentId: comment.id });

                setCommentList((comments) =>
                  comments.filter((c) => c.id !== comment.id)
                );
                setCommentCount(commentCount - 1);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostCommentSectionComponent;

const PollComment = ({
  id,
  text,
  authorName,
  authorMbti,
  isMe,
  isAuthor,
  updatedAt,
  like,
  dislike,
  reaction,
  onDelete,
}: {
  id: number;
  text: string;
  authorName: string | null;
  authorMbti: string | null;
  isMe: boolean;
  isAuthor: boolean;
  updatedAt: Date;
  like: number;
  dislike: number;
  reaction: 'like' | 'dislike' | null | undefined;
  onDelete: () => Promise<void>;
}) => {
  const { toast } = useToast();
  const [commentText, setCommentText] = useState<string>(text);

  const [isEdit, setIsEdit] = useState(false);

  const { mutateAsync: updateComment } = api.comment.update.useMutation({
    onError() {
      toast.update({
        theme: 'error',
        message: '댓글이 저장되지 않았습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });

  const { mutateAsync: updateReaction } =
    api.commentReaction.upsert.useMutation();

  return (
    <div className="flex flex-col gap-1 border-t border-neutral-content/20 py-3 first:border-t-0">
      {!isEdit ? (
        <PostCommentShow
          text={commentText}
          authorName={authorName}
          authorMbti={authorMbti}
          isMe={isMe}
          isAuthor={isAuthor}
          updatedAt={updatedAt}
          like={like}
          dislike={dislike}
          reaction={reaction}
          onClickEdit={() => setIsEdit(true)}
          onClickDelete={onDelete}
          onReact={async (reaction) => {
            await updateReaction({
              commentId: id,
              type: reaction ?? null,
            });
          }}
        />
      ) : (
        <PostCommentEdit
          initialText={commentText}
          onCancel={() => setIsEdit(false)}
          onSave={async (content) => {
            await updateComment({
              id,
              content,
            });
            setCommentText(content);
            setIsEdit(false);
          }}
        />
      )}
    </div>
  );
};

const PostCommentShow = ({
  text,
  authorName,
  authorMbti,
  isMe,
  isAuthor,
  updatedAt,
  like,
  dislike,
  reaction,
  onClickEdit,
  onClickDelete,
  onReact,
}: {
  text: string;
  authorName: string | null;
  authorMbti: string | null;
  isMe: boolean;
  isAuthor: boolean;
  updatedAt: Date;
  like: number;
  dislike: number;
  reaction: UserReaction;
  onClickEdit: () => void;
  onClickDelete: () => void;
  onReact: (reaction: UserReaction) => Promise<void>;
}) => {
  return (
    <div className="relative flex flex-col gap-1">
      <div className="flex text-xs opacity-70">
        {isAuthor && <div className="dot-between text-primary">{'글쓴이'}</div>}
        {authorName && <div className="dot-between">{authorName}</div>}
        {authorMbti && <div className="dot-between">{authorMbti}</div>}
        <div className="dot-between font-light">{formatTimeAgo(updatedAt)}</div>
        {isMe && (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="absolute -top-1 right-0 rounded-lg p-1 hover:bg-slate-500"
            >
              <MoreVerticalIcon size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-18 min-w-0 border-base-content/10 bg-base-100 text-xs text-primary-content"
              collisionPadding={8}
              align="end"
            >
              <DropdownMenuItem
                className="flex items-center justify-between gap-2 p-1 py-1.5 opacity-70"
                onClick={() => onClickEdit()}
              >
                <PencilIcon size={14} />
                <div>수정</div>
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
                      onClick={onClickDelete}
                    >
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="text-sm">{text}</div>
      <div className="mt-2 flex">
        <LikeDislike
          like={like}
          dislike={dislike}
          userSelect={reaction}
          onUpdate={onReact}
        />
      </div>
    </div>
  );
};

const PostCommentEdit = ({
  initialText = '',
  hideButtonsByDefault = false,
  onSave,
  onCancel,
}: {
  initialText?: string;
  hideButtonsByDefault?: boolean;
  onSave: (text: string) => Promise<void>;
  onCancel?: () => void;
}) => {
  const { register, watch, handleSubmit, setValue, formState } = useForm({
    resolver: zodResolver(z.object({ text: z.string().trim().min(1) })),
    defaultValues: {
      text: initialText,
    },
  });

  const [showButtons, setShowButtons] = useState(!hideButtonsByDefault);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <TextArea
        {...register('text')}
        rows={Math.min(watch('text').split('\n').length, 4)}
        className={cn(
          'w-full border-b border-base-content/60 bg-transparent px-0 py-1 focus-visible:border-base-content'
        )}
        placeholder="댓글 남기기"
        onFocus={() => setShowButtons(true)}
      />
      {showButtons && (
        <div className="flex justify-end gap-2">
          {!isSubmitting && (
            <Button
              size="xs"
              onClick={() => {
                onCancel?.();
                setValue('text', initialText);
                setShowButtons(false);
              }}
            >
              취소
            </Button>
          )}
          <Button
            theme="primary"
            size="xs"
            disabled={!formState.isValid || isSubmitting}
            onClick={handleSubmit(async ({ text }) => {
              setIsSubmitting(true);
              try {
                await onSave(text);
                setValue('text', '');
                setShowButtons(false);
              } finally {
                setIsSubmitting(false);
              }
            })}
          >
            저장
          </Button>
        </div>
      )}
    </div>
  );
};
