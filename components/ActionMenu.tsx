import { cn } from '@/lib/utils';
import { IconButton } from './ui/IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MoreVerticalIcon } from 'lucide-react';

type ActionMenuItem = {
  name: string;
  icon: React.FC<{ size?: number | string }>;
  iconSize?: number;
  disabled?: boolean;
  onClick: () => void;
};

type ActionMenuProps = {
  items: ActionMenuItem[];
  size?: number;
};

export default function ActionMenu({ items, size = 20 }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          size="xs"
          shape={'square'}
          className="bg-base-100/60 text-primary-content/80 hover:bg-base-100/90"
        >
          <MoreVerticalIcon size={size} />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-18 min-w-0 rounded-sm border border-base-content/10 bg-base-100/70 text-xs text-primary-content shadow"
        side="top"
        sideOffset={2}
        align="end"
      >
        {items.map(({ name, icon: Icon, iconSize, disabled, onClick }) => (
          <DropdownMenuItem
            key={name}
            className={cn(
              'flex select-none items-center justify-between gap-3 p-1.5 cursor-pointer',
              {
                'pointer-events-none opacity-40 cursor-default': disabled,
              }
            )}
            onClick={onClick}
          >
            {<Icon size={iconSize ?? 14} />}
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
