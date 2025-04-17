import { Suspense } from 'react';
import Link from 'next/link';
import CommunityBannerImage from '@/public/community_banner_1.png';
import CommunityIconImage from '@/public/planet_image_1.png';
import { api, HydrateClient } from '@/trpc/server';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import LoadingBox from '@/components/ui/LoadingBox';
import CommunityBanner from '@/components/community/CommunityBanner';
import CommunityHeaderTemplate from '@/components/community/CommunityHeaderTemplate';
import CommunityIcon from '@/components/community/CommunityIcon';
import MainLayout from '@/components/layouts/MainLayout';
import PollList from '@/components/poll/PollList';
import PollSidebarDescription from '@/components/poll/PollSidebarDescription';
import RootHeader from '@/components/RootHeader';

export default function PollsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  void api.poll.list.prefetchInfinite({
    search: searchParams?.search,
  });

  return (
    <HydrateClient>
      <RootHeader />
      <MainLayout
        header={
          <CommunityHeaderTemplate
            title={'설문조사'}
            banner={<CommunityBanner bannerSrc={CommunityBannerImage} />}
            icon={<CommunityIcon iconUrl={CommunityIconImage} />}
            right={
              <Link href={`/polls/create`}>
                <Button variant={'outline'} LeftIcon={PlusIcon}>
                  설문 만들기
                </Button>
              </Link>
            }
          />
        }
        body={
          <Suspense fallback={<LoadingBox className="h-full" />}>
            <PollList searchKeyword={searchParams?.search} />
          </Suspense>
        }
        aside={<PollSidebarDescription />}
      />
    </HydrateClient>
  );
}
