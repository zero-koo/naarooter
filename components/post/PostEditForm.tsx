'use client';

import { useRouter } from 'next/navigation';
import { trpc } from '@/client/trpcClient';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { useToast } from '@/hooks/useToast';

import BaseTitleDescriptionForm from '../BaseTitleDescriptionForm';

export const PostEditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [post] = usePostQuery(id);

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

  return (
    <BaseTitleDescriptionForm
      title={'글 수정하기'}
      backLink={`/posts/${id}`}
      initialValues={{
        title: post.title,
        contents: post.description,
      }}
      onSubmit={(data) =>
        mutate({
          id,
          title: data.title,
          description: data.contents,
        })
      }
    />
  );
};
