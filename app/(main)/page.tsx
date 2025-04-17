import { Suspense } from 'react';
import CommunityBannerImage from '@/public/community_banner_1.png';
import CommunityIconImage from '@/public/planet_image_1.png';
import { api, HydrateClient } from '@/trpc/server';

import LoadingBox from '@/components/ui/LoadingBox';
import CommunityBanner from '@/components/community/CommunityBanner';
import CommunityHeaderTemplate from '@/components/community/CommunityHeaderTemplate';
import CommunityHeaderView from '@/components/community/CommunityHeaderView';
import CommunityIcon from '@/components/community/CommunityIcon';
import MainLayout from '@/components/layouts/MainLayout';
import RootHeader from '@/components/RootHeader';

import PollList from './components/PollList';
import PostList from './components/PostList';
import PostSearchResultList from './components/PostSearchResultList';

export default function PollsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  void api.poll.list.prefetchInfinite({
    limit: 2,
  });
  void api.post.list.prefetchInfinite({
    limit: 10,
  });

  return (
    <HydrateClient>
      <RootHeader />
      <MainLayout
        header={
          <CommunityHeaderTemplate
            title={'Nuts Planet'}
            banner={<CommunityBanner bannerSrc={CommunityBannerImage} />}
            icon={<CommunityIcon iconUrl={CommunityIconImage} />}
          />
        }
        body={
          searchParams?.search ? (
            <PostSearchResultList searchKeyword={searchParams.search} />
          ) : (
            <Suspense fallback={<LoadingBox className="h-full" />}>
              <div className="flex-1 overflow-auto">
                <CommunityHeaderView title="설문조사" href="/polls" />
                <PollList />
                <CommunityHeaderView title="최근 포스트" href="/posts" />
                <PostList />
              </div>
            </Suspense>
          )
        }
      />
    </HydrateClient>
  );
}
