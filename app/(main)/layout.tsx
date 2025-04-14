import { auth } from '@/auth';
import { api, HydrateClient } from '@/trpc/server';

import GlobalNavigation from '@/components/nav/GlobalNavigation';

import styles from '../layout.module.css';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  api.community.myList.prefetch({});

  return (
    <HydrateClient>
      <div className={styles.outer}>
        <aside className="mr-3 hidden w-40 py-3 md:block">
          <GlobalNavigation isLoggedIn={!!session?.user} />
        </aside>
        <div
          className={
            'flex w-screen max-w-[540px] flex-col items-center lg:max-w-[750px]'
          }
        >
          {children}
        </div>
      </div>
    </HydrateClient>
  );
}
