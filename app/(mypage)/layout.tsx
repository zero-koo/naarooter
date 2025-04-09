import { HydrateClient } from '@/trpc/server';

import GlobalNavigation from '@/components/nav/GlobalNavigation';
import RootHeader from '@/components/RootHeader';

import styles from '../layout.module.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HydrateClient>
      <div className={styles.outer}>
        <aside className="mr-3 hidden w-40 py-3 md:block">
          <GlobalNavigation />
        </aside>
        <div className={styles.inner}>
          <RootHeader />
          {children}
        </div>
      </div>
    </HydrateClient>
  );
}
