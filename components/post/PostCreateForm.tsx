'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';

import { useToast } from '@/hooks/useToast';

import BaseTitleDescriptionForm from '../BaseTitleDescriptionForm';

export const PostCreateForm = ({ listGroupId }: { listGroupId?: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate } = api.post.create.useMutation({
    onSuccess(data) {
      toast.update({
        message: '글이 생성되었습니다.',
        theme: 'success',
      });

      router.push(`/community/${listGroupId}/post/${data.id}`);
    },
    onError() {
      toast.update({
        message: '글이 생성되지 않았습니다. 잠시 후 다시 시도해주세요.',
        theme: 'error',
      });
    },
  });

  return (
    <BaseTitleDescriptionForm
      title={'글 쓰기'}
      backLink={listGroupId ? `/community/${listGroupId}` : '/posts'}
      onSubmit={(data) => {
        mutate({
          title: data.title,
          communityId: data.communityId,
          description: data.contents,
          images: [], // TODO: Check!
        });
      }}
    />
  );
};
