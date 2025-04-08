'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

import CommunityForm from './CommunityForm';

const CommunityCreateForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  api.community.topics.useQuery();
  const { mutate: requestCreateCommunity, isPending: isSubmitting } =
    api.community.create.useMutation({
      onSuccess(data) {
        onSubmit?.();
        queryClient.invalidateQueries({
          queryKey: getQueryKey(api.community.myList),
        });
        router.push(`/community/${data.id}`);
      },
    });

  return (
    <CommunityForm
      isSubmitting={isSubmitting}
      onSubmit={(data) =>
        requestCreateCommunity({
          ...data,
          topicIds: data.topics.map(({ id }) => id),
        })
      }
    />
  );
};

export default CommunityCreateForm;
