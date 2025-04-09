import { auth } from '@/auth';
import { api } from '@/trpc/server';
import { CheckIcon, HomeIcon, InfoIcon, ListIcon } from 'lucide-react';

import CommunityNavigation from './CommunityNavigation';
import GlobalNavigationContainer from './GlobalNavigationContainer';
import { NavMenu } from './NavMenu';
import { NavMenuIcon } from './NavMenuIcon';
import NavSubtitle from './NavSubtitle';

const GlobalNavigation = async () => {
  const session = await auth();

  return (
    <GlobalNavigationContainer>
      <NavMenu
        link={'/'}
        icon={
          <NavMenuIcon>
            <HomeIcon size={16} strokeWidth={2.5} />
          </NavMenuIcon>
        }
      >
        홈
      </NavMenu>
      <NavMenu link={'/polls'} icon={<NavMenuIcon>Q</NavMenuIcon>}>
        설문조사
      </NavMenu>

      {session?.user ? (
        <>
          <NavSubtitle>커뮤니티</NavSubtitle>
          <CommunityNavigation />
          <NavSubtitle>나</NavSubtitle>
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
        </>
      ) : null}
    </GlobalNavigationContainer>
  );
};

export default GlobalNavigation;
