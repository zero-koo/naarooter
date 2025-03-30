'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
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

  const { mutate } = api.post.update.useMutation({
    onSuccess(data) {
      toast.update({
        message: '글이 수정되었습니다.',
        theme: 'success',
      });

      queryClient.invalidateQueries({
        queryKey: [
          getQueryKey(api.post.byId, { id }),
          getQueryKey(api.post.list),
        ],
      });

      router.push(`/post/${data.id}`);
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
      communityId={post.communityId}
      backLink={`/post/${id}`}
      initialValues={{
        title: post.title,
        contents: post.description,
      }}
      communityUpdateDisabled
      onSubmit={(data) =>
        mutate({
          postId: id,
          title: data.title,
          description: data.contents,
          images: [], // TODO:
        })
      }
    />
  );
};
