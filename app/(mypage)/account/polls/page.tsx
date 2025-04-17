import { Suspense } from 'react';
import CommunityBannerImage from '@/public/community_banner_1.png';
import CommunityIconImage from '@/public/planet_image_1.png';
import { api, HydrateClient } from '@/trpc/server';
import { NextPage } from '@/types/shared';

import LoadingBox from '@/components/ui/LoadingBox';
import CommunityBanner from '@/components/community/CommunityBanner';
import CommunityHeaderTemplate from '@/components/community/CommunityHeaderTemplate';
import CommunityIcon from '@/components/community/CommunityIcon';
import MainLayout from '@/components/layouts/MainLayout';
import RootHeader from '@/components/RootHeader';

import MyVotedPollList from './components/MyVotedPollList';

const MyPolls: NextPage = () => {
  void api.poll.myList.prefetchInfinite({});

  return (
    <HydrateClient>
      <RootHeader />
      <MainLayout
        header={
          <CommunityHeaderTemplate
            title={'내가 참여한 설문'}
            banner={<CommunityBanner bannerSrc={CommunityBannerImage} />}
            icon={<CommunityIcon iconUrl={CommunityIconImage} />}
          />
        }
        body={
          <Suspense fallback={<LoadingBox className="h-full" />}>
            <MyVotedPollList />
          </Suspense>
        }
      />
    </HydrateClient>
  );
};

export default MyPolls;
