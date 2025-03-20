import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logout } from '@/actions/logout';
import { UserRound } from 'lucide-react';

import { useUser } from '@/hooks/useUser';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

function UserButton() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="size-8 overflow-hidden rounded-full">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex-center size-full bg-base-100">
              <UserRound strokeWidth={1.5} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-24 min-w-0 border-base-content/10 bg-base-100 text-xs text-primary-content"
            collisionPadding={0}
            sideOffset={5}
            alignOffset={-5}
            align="end"
          >
            <DropdownMenuItem
              className="flex items-center justify-between gap-2 p-1.5 opacity-70"
              onClick={() => {
                router.push('/account');
              }}
            >
              회원 정보
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between gap-2 p-1.5 opacity-70"
              onClick={() => logout()}
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="size-full bg-base-100" />
      )}
    </div>
  );
}

export default UserButton;
