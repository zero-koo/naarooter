import type { Comment as TComment } from '@/server/api/routers/comment/comment.type';

import Comment from './Comment';
import CommentInput from './CommentInput';

const CommentListView = ({
  postId,
  commentsChunks,
  commentsCount,
  onAddComment,
  onDelete,
  onIncreaseCommentsCount,
  onDecreaseCommentsCount,
}: {
  postId: string;
  commentsChunks: Array<{ comments: TComment[] }>;
  commentsCount: number;
  onAddComment: (content: string) => Promise<void>;
  onDelete: (page: number, id: number) => void;
  onIncreaseCommentsCount: () => void;
  onDecreaseCommentsCount: () => void;
}) => {
  return (
    <div className="flex-1">
      <div className="mb-1.5 font-bold">댓글 {commentsCount}개</div>
      <CommentInput onSave={onAddComment} hideButtonsByDefault />
      {commentsChunks.map((chunk, page) =>
        chunk.comments.map((comment) => (
          <Comment
            key={`${page}-${comment.id}`}
            postId={postId}
            initialData={comment}
            onDelete={() => onDelete(page, comment.id)}
            onIncreaseCommentsCount={onIncreaseCommentsCount}
            onDecreaseCommentsCount={onDecreaseCommentsCount}
          />
        ))
      )}
    </div>
  );
};

export default CommentListView;
