'use client';

import GlobalNavigationContainer from './GlobalNavigationContainer';
import { NavMenuIcon } from './NavMenuIcon';
import { NavMenu } from './NavMenu';

const GlobalNavigation = () => {
  return (
    <GlobalNavigationContainer>
      <NavMenu link={'/polls'} icon={<NavMenuIcon>Q</NavMenuIcon>}>
        설문조사
      </NavMenu>
      <div className="mb-1 mt-4 w-full px-2.5 text-left text-xs opacity-50">
        커뮤니티
      </div>
      <NavMenu link={'/posts'} icon={<NavMenuIcon>A</NavMenuIcon>}>
        전체방
      </NavMenu>
      <NavMenu link={'/posts/group/x'} icon={<NavMenuIcon>X</NavMenuIcon>}>
        자유방
      </NavMenu>
      <NavMenu link={'/posts/group/e'} icon={<NavMenuIcon>E</NavMenuIcon>}>
        외향방
      </NavMenu>
      <NavMenu link={'/posts/group/i'} icon={<NavMenuIcon>I</NavMenuIcon>}>
        내향방
      </NavMenu>
      <NavMenu link={'/posts/group/s'} icon={<NavMenuIcon>S</NavMenuIcon>}>
        현실방
      </NavMenu>
      <NavMenu link={'/posts/group/n'} icon={<NavMenuIcon>N</NavMenuIcon>}>
        이상방
      </NavMenu>
      <NavMenu link={'/posts/group/f'} icon={<NavMenuIcon>F</NavMenuIcon>}>
        감성방
      </NavMenu>
      <NavMenu link={'/posts/group/t'} icon={<NavMenuIcon>T</NavMenuIcon>}>
        이성방
      </NavMenu>
      <NavMenu link={'/posts/group/j'} icon={<NavMenuIcon>J</NavMenuIcon>}>
        계획방
      </NavMenu>
      <NavMenu link={'/posts/group/p'} icon={<NavMenuIcon>P</NavMenuIcon>}>
        즉흥방
      </NavMenu>
    </GlobalNavigationContainer>
  );
};

export default GlobalNavigation;
