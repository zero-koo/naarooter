import RootHeader from '@/components/RootHeader';
import styles from '../layout.module.css';
import GlobalNavigation from '@/components/nav/GlobalNavigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.outer}>
      <aside className="mr-3 hidden w-40 py-3 md:block">
        <GlobalNavigation />
      </aside>
      <div className={styles.inner}>
        <RootHeader />
        {children}
      </div>
    </div>
  );
}
