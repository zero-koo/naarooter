'use client';

import { CheckIcon, HomeIcon, InfoIcon, ListIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

import GlobalNavigationContainer from './GlobalNavigationContainer';
import { NavMenu } from './NavMenu';
import NavSubtitle from './NavSubtitle';

const GlobalNavigation = () => {
  const { status } = useSession();
  return (
    <GlobalNavigationContainer>
      <NavMenu link={'/'} icon={<HomeIcon size={16} strokeWidth={2.5} />}>
        홈
      </NavMenu>
      <NavMenu link={'/polls'} icon={'Q'}>
        설문조사
      </NavMenu>
      <NavSubtitle>커뮤니티</NavSubtitle>
      <NavMenu link={'/posts'} icon={'A'}>
        전체방
      </NavMenu>
      <NavMenu link={'/posts/group/x'} icon={'X'}>
        자유방
      </NavMenu>
      <NavMenu link={'/posts/group/e'} icon={'E'}>
        외향방
      </NavMenu>
      <NavMenu link={'/posts/group/i'} icon={'I'}>
        내향방
      </NavMenu>
      <NavMenu link={'/posts/group/s'} icon={'S'}>
        현실방
      </NavMenu>
      <NavMenu link={'/posts/group/n'} icon={'N'}>
        이상방
      </NavMenu>
      <NavMenu link={'/posts/group/f'} icon={'F'}>
        감성방
      </NavMenu>
      <NavMenu link={'/posts/group/t'} icon={'T'}>
        이성방
      </NavMenu>
      <NavMenu link={'/posts/group/j'} icon={'J'}>
        계획방
      </NavMenu>
      <NavMenu link={'/posts/group/p'} icon={'P'}>
        즉흥방
      </NavMenu>

      {status === 'authenticated' ? (
        <>
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
