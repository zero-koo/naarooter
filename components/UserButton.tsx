import { useAuth, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';

function UserButton() {
  const router = useRouter();
  const { user } = useClerk();
  const { signOut } = useAuth();

  return (
    <div className="h-8 w-8 overflow-hidden rounded-full">
      {user?.imageUrl ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={user.imageUrl}
              alt="profile image"
              width={32}
              height={32}
            />
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
              onClick={() => {
                signOut();
                router.replace('/');
              }}
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="h-full w-full bg-base-100" />
      )}
    </div>
  );
}

export default UserButton;
