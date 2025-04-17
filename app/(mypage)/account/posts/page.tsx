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

import MyPostList from './components/MyPostList';

const MyPosts: NextPage = () => {
  void api.post.myList.prefetchInfinite({});

  return (
    <HydrateClient>
      <RootHeader />
      <MainLayout
        header={
          <CommunityHeaderTemplate
            title={'나의 포스트'}
            banner={<CommunityBanner bannerSrc={CommunityBannerImage} />}
            icon={<CommunityIcon iconUrl={CommunityIconImage} />}
          />
        }
        body={
          <Suspense fallback={<LoadingBox className="h-full" />}>
            <MyPostList />
          </Suspense>
        }
      />
    </HydrateClient>
  );
};

export default MyPosts;
