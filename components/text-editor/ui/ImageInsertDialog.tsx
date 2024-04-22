import { SingleImageUploader } from '@/components/SingleImageUploader';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useState } from 'react';

export default function ImageInsertDialog({
  initialImage,
  open,
  onSave,
  onClose,
}: {
  initialImage?: string;
  open?: boolean;
  onSave: (src: string) => void;
  onClose: () => void;
}) {
  const [image, setImage] = useState(initialImage);

  return (
    <Dialog
      open={open ?? true}
      onOpenChange={(open) => {
        !open && onClose?.();
      }}
    >
      <DialogContent className="w-fit bg-base-100">
        <DialogHeader>
          <DialogTitle>이미지 삽입</DialogTitle>
        </DialogHeader>
        <SingleImageUploader
          value={image}
          onChange={(image) => {
            setImage(image);
          }}
        />
        <DialogFooter>
          <Button
            variant={'primary'}
            size={'sm'}
            disabled={!image}
            onClick={() => {
              if (!image) return;
              onSave(image);
              onClose();
            }}
          >
            확인
          </Button>
          <Button size={'sm'} onClick={onClose}>
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
