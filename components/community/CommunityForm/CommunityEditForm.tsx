'use client';

import { Community } from '@/server/api/routers/community/communty.type';
import { api } from '@/trpc/react';

import CommunityForm from './CommunityForm';

const CommunityEditForm = ({
  community,
  onSubmit,
}: {
  community: Community;
  onSubmit?: () => void;
}) => {
  const apiUtils = api.useUtils();

  api.community.topics.useQuery();
  const { mutate: requestUpdateCommunity, isPending: isSubmitting } =
    api.community.update.useMutation({
      onSuccess() {
        apiUtils.community.myList.invalidate();
        apiUtils.community.byId.invalidate({ id: community.id });

        onSubmit?.();
      },
    });

  return (
    <CommunityForm
      initialData={{
        name: community.name,
        description: community.description,
        topics: community.topics,
      }}
      nameFieldDisabled
      isSubmitting={isSubmitting}
      onSubmit={(data) =>
        requestUpdateCommunity({
          id: community.id,
          description: community.description,
          topicIds: data.topics.map(({ id }) => id),
        })
      }
    />
  );
};

export default CommunityEditForm;
