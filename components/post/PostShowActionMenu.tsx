import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trpc } from '@/client/trpcClient';
import { usePostContext } from '@/contexts/PostContext';
import { MoreVerticalIcon, PencilIcon, Trash2 } from 'lucide-react';

import { usePostQuery } from '@/hooks/queries/usePostQuery';
import { useToast } from '@/hooks/useToast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/AlertDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const PostShowActionMenu = React.memo(() => {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = usePostContext();
  const [{ communityId }] = usePostQuery(id);

  const { mutate: deletePost } = trpc.post.delete.useMutation({
    onSuccess() {
      router.replace(`/posts/group/${communityId}`);
    },
    onError() {
      toast.update({
        theme: 'error',
        message: '글이 삭제되지 않았습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="my-0.5 ml-auto rounded-lg p-1 hover:bg-slate-500"
      >
        <MoreVerticalIcon size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-18 min-w-0"
        collisionPadding={8}
        align="end"
      >
        <DropdownMenuItem className="flex items-center justify-between gap-2 p-1 py-1.5 opacity-70">
          <PencilIcon size={14} />
          <Link href={`/posts/${id}/edit`}>수정</Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="flex items-center justify-between gap-2 p-1 py-1.5 opacity-70"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 size={14} />
              <div>삭제</div>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
              <AlertDialogDescription>
                댓글을 완전히 삭제할까요?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant={'destructive'}
                onClick={() => deletePost({ id })}
              >
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

PostShowActionMenu.displayName = 'PostShowActionMenu';

export default PostShowActionMenu;
