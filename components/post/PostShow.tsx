'use client';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import PostShowComponent from './PostShow.component';
import PostCommentSection from '../poll/PostCommentSection';

interface PostShowProps {
  id: string;
}

const PostShow = ({ id }: PostShowProps) => {
  const { data } = usePostQuery(id);

  if (!data) return 'Loading...';

  return (
    <div>
      <PostShowComponent
        groupId={data.groupId}
        id={id}
        title={data.title}
        description={data.description as string}
        author={data.author}
        createdAt={data.createdAt}
      />
      <PostCommentSection postId={id} authorId={data.authorId} />
    </div>
  );
};

export default PostShow;
