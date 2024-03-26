import GlobalNavigationContainer from '@/components/nav/GlobalNavigationContainer';
import styles from '../layout.module.css';
import { NavMenu } from '@/components/nav/NavMenu';
import { CheckIcon, InfoIcon, ListIcon } from 'lucide-react';
import { NavMenuIcon } from '@/components/nav/NavMenuIcon';

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
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

function Navigation() {
  return (
    <GlobalNavigationContainer>
      <NavMenu
        link={'/account'}
        icon={
          <NavMenuIcon>
            <InfoIcon size={16} strokeWidth={2.5} />
          </NavMenuIcon>
        }
      >
        회원 정보
      </NavMenu>
      <NavMenu
        link={'/account/posts'}
        icon={
          <NavMenuIcon>
            <ListIcon size={16} strokeWidth={2.5} />
          </NavMenuIcon>
        }
      >
        나의 포스트
      </NavMenu>
      <NavMenu
        link={'/account/polls'}
        icon={
          <NavMenuIcon>
            <CheckIcon size={16} strokeWidth={2.5} />
          </NavMenuIcon>
        }
      >
        내가 참여한 투표
      </NavMenu>
    </GlobalNavigationContainer>
  );
}
