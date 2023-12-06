'use client';

import { trpc } from '@/client/trpcClient';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { PostCreateOrEditForm } from './PostCreateOrEditForm';

export const PostCreateForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate } = trpc.post.add.useMutation({
    onSuccess(data) {
      toast.update({
        message: '글이 생성되었습니다.',
        theme: 'success',
      });

      router.push(`/post/${data.id}`);
    },
    onError() {
      toast.update({
        message: '글이 생성되지 않았습니다. 잠시 후 다시 시도해주세요.',
        theme: 'error',
      });
    },
  });

  return (
    <PostCreateOrEditForm
      title={'글 쓰기'}
      prevLink={'/posts'}
      onSubmit={(data) =>
        mutate({
          title: data.title,
          description: JSON.stringify(data.contents),
        })
      }
    />
  );
};
