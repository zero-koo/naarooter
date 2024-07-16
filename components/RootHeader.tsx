'use client';

import { useURLSearchParams } from '@/hooks/useURLSearchParams';

import RootHeaderContainer from './RootHeaderContainer';
import SearchBox from './SearchBox';

const RootHeader = () => {
  const { setSearchParams } = useURLSearchParams();

  return (
    <RootHeaderContainer>
      <SearchBox onSubmit={(value) => setSearchParams('search', value)} />
    </RootHeaderContainer>
  );
};

export default RootHeader;
