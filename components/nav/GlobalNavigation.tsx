import { auth } from '@/auth';
import { CheckIcon, HomeIcon, InfoIcon, ListIcon } from 'lucide-react';

import CommunityNavigation from './CommunityNavigation';
import GlobalNavigationContainer from './GlobalNavigationContainer';
import { NavMenu } from './NavMenu';
import NavSubtitle from './NavSubtitle';

const GlobalNavigation = async () => {
  const session = await auth();

  return (
    <GlobalNavigationContainer>
      <NavMenu link={'/'} icon={<HomeIcon size={16} strokeWidth={2.5} />}>
        홈
      </NavMenu>
      <NavMenu link={'/polls'} icon={'Q'}>
        설문조사
      </NavMenu>

      {session?.user ? (
        <>
          <NavSubtitle>커뮤니티</NavSubtitle>
          <CommunityNavigation />
          <NavSubtitle>나</NavSubtitle>
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
          <NavMenu
            link={'/account'}
            icon={<InfoIcon size={16} strokeWidth={2.5} />}
          >
            회원 정보
          </NavMenu>
        </>
      ) : null}
    </GlobalNavigationContainer>
  );
};

export default GlobalNavigation;
