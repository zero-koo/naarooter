'use client';

import GlobalNavigationContainer from './GlobalNavigationContainer';
import { NavMenu } from './NavMenu';

const GlobalNavigation = () => {
  return (
    <GlobalNavigationContainer>
      <NavMenu link={'/polls'} icon={'Q'}>
        설문조사
      </NavMenu>
      <div className="mb-1 mt-4 w-full px-2.5 text-left text-xs opacity-50">
        커뮤니티
      </div>
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
    </GlobalNavigationContainer>
  );
};

export default GlobalNavigation;
