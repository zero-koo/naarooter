import { usePostCommentsQuery } from '@/hooks/queries/usePostComentsQuery';
import { cn, formatTimeAgo } from '@/lib/utils';
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { Textarea } from '../ui/textarea';
import { trpc } from '@/client/trpcClient';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

interface PostCommentSectionProps {
  postId: string;
  authorId: string;
}

const PostCommentSection = ({ postId, authorId }: PostCommentSectionProps) => {
  const { user, isSignedIn } = useUser();
  const { data: commentsData } = usePostCommentsQuery({ postId });

  const { mutate: addComment } = trpc.comment.add.useMutation();

  return (
    <section className="mt-2 bg-base-200 px-3 py-1">
      <div className="flex flex-col">
        {commentsData ? (
          <div className="py-2 font-semibold">{`댓글 ${commentsData?.pages[0].totalCount}개`}</div>
        ) : null}
        {isSignedIn && (
          <div className="mb-1 py-1">
            <PollCommentEdit
              hideButtonsByDefault
              onSave={(text) =>
                addComment({
                  postId,
                  content: text,
                })
              }
            />
          </div>
        )}
        <div className="text-xs">
          {commentsData?.pages
            .flatMap(({ comments }) => comments)
            .map((comment) => (
              <PollComment
                key={comment.id}
                id={comment.id}
                text={comment.content?.toString() ?? ''}
                authorMbti={comment.author.mbti!}
                authorName={comment.author.name}
                isMe={comment.author.id === user?.id}
                isAuthor={comment.author.id === authorId}
                updatedAt={comment.updatedAt}
              ></PollComment>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PostCommentSection;

const PollComment = ({
  id,
  text,
  authorName,
  authorMbti,
  isMe,
  isAuthor,
  updatedAt,
}: {
  id: number;
  text: string;
  authorName: string | null;
  authorMbti: string;
  isMe: boolean;
  isAuthor: boolean;
  updatedAt: Date;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const { mutate: updateComment } = trpc.comment.update.useMutation({
    onSuccess() {
      setIsEdit(false);
    },
  });
  const { mutate: removeComment } = trpc.comment.delete.useMutation({
    onSuccess() {
      setIsEdit(false);
    },
  });

  return (
    <div
      key={id}
      className="flex flex-col gap-1 border-t border-neutral-content/20 py-3 first:border-t-0"
    >
      {!isEdit ? (
        <div className="relative flex flex-col gap-1">
          <div className="flex text-xs opacity-70 ">
            {isAuthor && (
              <div className="dot-between text-primary">{'글쓴이'}</div>
            )}
            {authorName && <div className="dot-between">{authorName}</div>}
            <div className="dot-between">{authorMbti}</div>
            <div className="dot-between font-light">
              {formatTimeAgo(updatedAt)}
            </div>
            {isMe && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="absolute -top-1 right-0 rounded-lg p-1 hover:bg-slate-500"
                >
                  <MoreVerticalIcon size={24} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-16 min-w-0 border-base-content/10 bg-base-100 text-xs text-primary-content"
                  collisionPadding={8}
                  align="end"
                >
                  <DropdownMenuItem
                    className="flex items-center gap-2 p-1 py-1.5 opacity-70"
                    onClick={() => setIsEdit(true)}
                  >
                    <PencilIcon size={14} />
                    <div>수정</div>
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        className="flex items-center gap-2 p-1 py-1.5 opacity-70"
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
                          onClick={() => {
                            removeComment({ id });
                          }}
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
        </div>
      ) : (
        <PollCommentEdit
          initialText={text}
          onCancel={() => setIsEdit(false)}
          onSave={(text) => {
            updateComment({
              id,
              content: text,
            });
          }}
        />
      )}
    </div>
  );
};

const PollCommentEdit = ({
  initialText = '',
  hideButtonsByDefault = false,
  onSave,
  onCancel,
}: {
  initialText?: string;
  hideButtonsByDefault?: boolean;
  onSave: (text: string) => void;
  onCancel?: () => void;
}) => {
  const { register, watch, handleSubmit, setValue, formState } = useForm({
    resolver: zodResolver(z.object({ text: z.string().trim().min(1) })),
    defaultValues: {
      text: initialText,
    },
  });

  const [showButtons, setShowButtons] = useState(!hideButtonsByDefault);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Textarea
        {...register('text')}
        rows={Math.min(watch('text').split('\n').length, 4)}
        className={cn(
          'w-full border-b border-base-content/60 bg-transparent py-1 px-0 focus-visible:border-base-content'
        )}
        placeholder="댓글 남기기"
        onFocus={() => setShowButtons(true)}
      />
      {showButtons && (
        <div className="flex justify-end gap-2">
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
          <Button
            theme="primary"
            size="xs"
            disabled={!formState.isValid}
            onClick={handleSubmit(({ text }) => {
              onSave(text);
              setValue('text', '');
              setShowButtons(false);
            })}
          >
            저장
          </Button>
        </div>
      )}
    </div>
  );
};
