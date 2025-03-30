import { api } from '@/trpc/react';
import { ChevronDown, Search } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type CommunitySelectorProps = {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const CommunitySelector = ({
  value,
  disabled,
  onChange,
}: CommunitySelectorProps) => {
  const [myCommunities] = api.community.myList.useSuspenseQuery({});

  const communityName = myCommunities.communities.find(
    (community) => community.id === value
  )?.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-full items-center border-b border-base-content/30 py-1.5 text-left text-sm text-base-content opacity-70"
        disabled={disabled}
      >
        <Search size={16} className="mr-1.5" />
        <span className="mr-1">{communityName ?? '커뮤니티를 선택하세요'}</span>
        <ChevronDown size={16} className="ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" fitWidthToTrigger>
        {myCommunities.communities.length ? (
          <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
            {myCommunities.communities.map((community) => (
              <DropdownMenuRadioItem key={community.id} value={community.id}>
                {community.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        ) : (
          <div className="p-10 text-center text-xs text-base-content opacity-70">
            가입한 커뮤니티가 없습니다
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommunitySelector;
