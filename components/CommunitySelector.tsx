import { ChevronDown, Search } from 'lucide-react';

import { COMMUNITY_GROUP_MAP } from '@/lib/constants';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type CommunitySelectorProps = {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const CommunitySelector = ({
  value,
  disabled,
  onChange,
}: CommunitySelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-full items-center border-b border-base-content/30 py-1.5 text-left text-sm text-base-content opacity-70"
        disabled={disabled}
      >
        <Search size={16} className="mr-1.5" />
        <span className="mr-1">
          {value
            ? COMMUNITY_GROUP_MAP[value as keyof typeof COMMUNITY_GROUP_MAP]
                .title
            : '커뮤니티를 선택하세요'}
        </span>
        <ChevronDown size={16} className="ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" fitWidthToTrigger>
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {Object.values(COMMUNITY_GROUP_MAP).map((group) => (
            <DropdownMenuRadioItem key={group.id} value={group.id}>
              {group.title}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommunitySelector;
