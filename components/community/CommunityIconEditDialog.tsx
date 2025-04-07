import { useState } from 'react';
import { api } from '@/trpc/react';
import { PencilIcon } from 'lucide-react';

import { useImageUpload } from '@/hooks/useImageUpload';
import { useToast } from '@/hooks/useToast';

import { SingleImageUploader } from '../SingleImageUploader';
import { Button } from '../ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';
import { IconButton } from '../ui/IconButton';

type CommunityIconEditDialogProps = {
  communityId: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CommunityIconEditDialog = ({
  communityId,
  isOpen,
  setOpen,
}: CommunityIconEditDialogProps) => {
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
        apiUtils.community.myList.invalidate();
      },
    }
  );
  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 group-hover:flex"
          size="xs"
        >
          <PencilIcon size={16} />
        </IconButton>
      </DialogTrigger>
      <DialogContent className="w-[300px] bg-base-100">
        <DialogTitle>커뮤니티 아이콘</DialogTitle>
        <div className="aspect-square">
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
                  iconUrl: url,
                });
                setOpen(false);
              } catch {
                toast.update({
                  message:
                    '커뮤니티 아이콘 저장에 실패하였습니다. 잠시 후 다시 시도해주세요.',
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

export default CommunityIconEditDialog;
