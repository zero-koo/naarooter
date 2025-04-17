import { api } from '@/trpc/react';

import CommunityDescriptionView from './CommunityDescriptionView';

const CommunityDescription = ({ communityId }: { communityId: string }) => {
  const [community] = api.community.byId.useSuspenseQuery({ id: communityId });

  return (
    <CommunityDescriptionView
      name={community.name}
      description={community.description}
      topics={community.topics.map((topic) => topic.name)}
      numUsers={community.numUsers}
    />
  );
};

export default CommunityDescription;
