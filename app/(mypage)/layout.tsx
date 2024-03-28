import GlobalNavigationContainer from '@/components/nav/GlobalNavigationContainer';
import styles from '../layout.module.css';
import { NavMenu } from '@/components/nav/NavMenu';
import { CheckIcon, InfoIcon, ListIcon } from 'lucide-react';
import { NavMenuIcon } from '@/components/nav/NavMenuIcon';
import RootHeaderContainer from '@/components/RootHeaderContainer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.outer}>
      <aside className="mr-3 hidden w-40 py-3 md:block">
        <Navigation />
      </aside>
      <div className={styles.inner}>
        <RootHeaderContainer />
        {children}
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <GlobalNavigationContainer>
      <NavMenu
        link={'/account'}
        icon={<InfoIcon size={16} strokeWidth={2.5} />}
      >
        회원 정보
      </NavMenu>
      <NavMenu
        link={'/account/posts'}
        icon={<ListIcon size={16} strokeWidth={2.5} />}
      >
        나의 포스트
      </NavMenu>
      <NavMenu
        link={'/account/polls'}
        icon={<CheckIcon size={16} strokeWidth={2.5} />}
      >
        내가 참여한 투표
      </NavMenu>
    </GlobalNavigationContainer>
  );
}
