'use client';

import { trpc } from '@/client/trpcClient';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { PostCreateOrEditForm } from './PostCreateOrEditForm';
import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const PostEditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data } = usePostQuery(id);

  const { mutate } = trpc.post.update.useMutation({
    onSuccess(data) {
      toast.update({
        message: '글이 수정되었습니다.',
        theme: 'success',
      });

      queryClient.invalidateQueries([
        getQueryKey(trpc.post.byId, { id }),
        getQueryKey(trpc.post.list),
      ]);

      router.push(`/posts/${data.id}`);
    },
    onError() {
      toast.update({
        message: '글이 수정되지 않았습니다. 잠시 후 다시 시도해주세요.',
        theme: 'error',
      });
    },
  });

  if (!data) return <div>Loading...</div>;

  return (
    <PostCreateOrEditForm
      title={'글 수정하기'}
      backLink={`/posts/${id}`}
      initialValues={{
        title: data.title,
        contents: JSON.parse(data.description),
      }}
      onSubmit={(data) =>
        mutate({
          id,
          title: data.title,
          description: JSON.stringify(data.contents),
        })
      }
    />
  );
};
