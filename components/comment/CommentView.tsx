import { cn, formatTimeAgo } from '@/lib/utils';
import { CommentContent, TComment } from '@/types/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  CornerDownRightIcon,
  MessageCircleIcon,
  MoreVerticalIcon,
  PencilIcon,
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
} from '../ui/AlertDialog';
import { Button } from '../Button';
import LikeDislikeV1 from '../LikeDislikeV1';
import { useState } from 'react';
import CommentInput from './CommentInput';
import CommentTargetUserTag from './CommentTargetUserTag';

export type CommentProps = TComment & {
  isAuthor: boolean;
  isPostAuthor: boolean;
  hideReplyCount?: boolean;
  onClickLike: () => void;
  onClickDislike: () => void;
  onAddReply: (content: CommentContent) => Promise<void>;
  onUpdate: (content: CommentContent) => Promise<void>;
  onDelete: () => Promise<void>;
  onToggleReplies?: () => void;
};

const CommentView = ({
  authorName,
  authorMBTI,
  content,
  isPostAuthor,
  isAuthor,
  createdAt,
  updatedAt,
  likeCount,
  dislikeCount,
  userReaction,
  commentsCount,
  status,
  targetUserName,
  hideReplyCount = false,
  onAddReply,
  onClickLike,
  onClickDislike,
  onUpdate,
  onDelete,
  onToggleReplies,
}: CommentProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const isDeleted = status === 'deleted';

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="flex flex-1 flex-col gap-1 border-b border-base-content/30 py-2">
      {!isEditMode ? (
        <>
          <div className="flex h-6 items-center text-xs opacity-70">
            {isPostAuthor && (
              <div className="dot-between text-primary">{'글쓴이'}</div>
            )}
            {authorName && <div className="dot-between">{authorName}</div>}
            {authorMBTI && <div className="dot-between">{authorMBTI}</div>}
            <div className="dot-between font-light">
              {`${formatTimeAgo(createdAt)}${
                updatedAt.getTime() !== createdAt.getTime() ? ' (수정됨)' : ''
              }`}
            </div>
            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="ml-auto rounded-lg p-1 hover:bg-slate-500"
                >
                  <MoreVerticalIcon size={24} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-18 min-w-0 border-base-content/10 bg-base-100 text-xs text-primary-content"
                  collisionPadding={8}
                  align="end"
                >
                  {!isDeleted && (
                    <DropdownMenuItem
                      className="flex items-center justify-between gap-2 p-1 py-1.5 opacity-70"
                      onClick={() => setIsEditMode(true)}
                    >
                      <PencilIcon size={14} />
                      <div>수정</div>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="flex items-center justify-between gap-2 p-1 py-1.5 opacity-70"
                    disabled={isDeleted && commentsCount > 0}
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    <Trash2Icon size={14} />
                    <div>삭제</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
                <AlertDialog
                  open={isDeleteModalOpen}
                  onOpenChange={setIsDeleteModalOpen}
                >
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
                      <AlertDialogDescription>
                        {commentsCount > 0
                          ? '답글이 있는 댓글은 완전히 삭제할 수 없으며, 댓글의 내용만 지워집니다. 계속 진행하시겠습니까?'
                          : '댓글을 완전히 삭제할까요?'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant={'destructive'}
                        onClick={() => onDelete()}
                      >
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenu>
            )}
          </div>
          <div
            className={cn('whitespace-pre-wrap text-sm', {
              'opacity-50 italic': isDeleted,
            })}
          >
            {isDeleted ? (
              '삭제된 댓글입니다'
            ) : (
              <>
                {targetUserName && (
                  <CommentTargetUserTag
                    username={targetUserName}
                    className="mb-1"
                  />
                )}
                <div>{content}</div>
              </>
            )}
          </div>
          <div className="mt-2 flex">
            <LikeDislikeV1
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              userSelect={userReaction}
              onClickLike={onClickLike}
              onClickDislike={onClickDislike}
            />
            {!hideReplyCount && !!commentsCount && (
              <button
                className="ml-4 flex items-center gap-1"
                onClick={() => {
                  if (!commentsCount) return;
                  onToggleReplies?.();
                }}
              >
                <MessageCircleIcon size={12} className="text-primary" />
                <span className="text-xs font-bold text-primary">{`답글 ${commentsCount}개`}</span>
              </button>
            )}
            <Button
              ghost
              size="xs"
              className="ml-2 font-semibold"
              onClick={() => setShowReplyInput((value) => !value)}
            >
              답글 쓰기
            </Button>
          </div>
        </>
      ) : (
        <div className="py-1">
          <div className="h-6 text-xs font-bold">댓글 수정</div>
          <CommentInput
            initialText={content}
            targetUserName={targetUserName}
            focusOnMount
            onSave={async (content) => {
              await onUpdate(content);
              setIsEditMode(false);
            }}
            onCancel={() => {
              setIsEditMode(false);
            }}
          />
        </div>
      )}
      {showReplyInput && (
        <div className="mt-1 flex">
          <div className="p-2 pl-0">
            <CornerDownRightIcon size={12} />
          </div>
          <CommentInput
            focusOnMount
            onSave={async (content) => {
              await onAddReply(content);
              setShowReplyInput(false);
            }}
            onCancel={() => setShowReplyInput(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CommentView;
