import { useCommunityContext } from '@/contexts/CommunityContext';
import { api } from '@/trpc/react';

import CommunityDescriptionView from './CommunityDescriptionView';

const CommunityDescription = () => {
  const { id } = useCommunityContext();
  const [community] = api.community.byId.useSuspenseQuery({ id });

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
