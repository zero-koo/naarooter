import { useState } from 'react';
import { api } from '@/trpc/react';
import { PencilIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';

import { SingleImageUploader } from '../SingleImageUploader';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';
import { IconButton } from '../ui/IconButton';

type CommunityBannerEditDialogProps = {
  communityId: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

const CommunityBannerEditDialog = ({
  communityId,
  isOpen,
  setOpen,
  className,
}: CommunityBannerEditDialogProps) => {
  const [image, setImage] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  const { uploadImage } = useImageUpload();

  const apiUtils = api.useUtils();

  const { mutateAsync: updateCommunityIcon } = api.community.update.useMutation(
    {
      onSuccess() {
        apiUtils.community.byId.invalidate({
          id: communityId,
        });
      },
    }
  );
  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton
          className={cn('rounded-full bg-base-300/80 opacity-90', className)}
          size="xs"
          onClick={() => setOpen(true)}
        >
          <PencilIcon size={14} />
        </IconButton>
      </DialogTrigger>
      <DialogContent className="max-w-screen w-[500px] bg-base-100">
        <DialogTitle>커뮤니티 배너 수정</DialogTitle>
        <div className="aspect-[7/1]">
          <SingleImageUploader value={image} onChange={setImage} />
        </div>
        <DialogFooter>
          <Button size="sm" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            size="sm"
            variant={'primary'}
            disabled={!image || isUploading}
            onClick={async () => {
              if (image === undefined) return;

              try {
                setIsUploading(true);
                const { url } = await uploadImage({
                  file: image,
                });
                updateCommunityIcon({
                  id: communityId,
                  bannerUrl: url,
                });
                setOpen(false);
              } catch {
                toast.update({
                  message:
                    '커뮤니티 배너 업로드에 실패하였습니다. 잠시 후 다시 시도해주세요.',
                  theme: 'error',
                });
              } finally {
                setIsUploading(false);
              }
            }}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommunityBannerEditDialog;
