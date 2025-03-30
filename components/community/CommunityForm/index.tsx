'use client';

import { api } from '@/trpc/react';

import CommunitFormView from './CommunityForm';

const CommunityForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  api.community.topics.useQuery();
  const { mutate: requestCreateCommunity, isPending: isSubmitting } =
    api.community.create.useMutation({
      onSuccess() {
        onSubmit?.();
      },
    });

  return (
    <CommunitFormView
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

export default CommunityForm;
