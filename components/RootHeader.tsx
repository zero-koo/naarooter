'use client';

import SearchBox from './SearchBox';
import { useURLSearchParams } from '@/hooks/useURLSearchParams';
import RootHeaderContainer from './RootHeaderContainer';

const RootHeader = () => {
  const { setSearchParams } = useURLSearchParams();

  return (
    <RootHeaderContainer>
      <SearchBox onSubmit={(value) => setSearchParams('search', value)} />
    </RootHeaderContainer>
  );
};

export default RootHeader;
