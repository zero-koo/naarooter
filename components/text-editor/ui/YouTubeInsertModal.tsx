import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { youtubeLinkRegex } from '@/lib/regex';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import TextInput from '@/components/TextInput';

import YoutubeEmbed from './YoutubeEmbed';

export default function YouTubeInputDialog({
  initialLink,
  open,
  onSave,
  onClose,
}: {
  initialLink?: string;
  open?: boolean;
  onSave: (videoId: string) => void;
  onClose: () => void;
}) {
  const { register, formState, getValues, handleSubmit } = useForm({
    resolver: zodResolver(
      z.object({
        link: z.string().trim().regex(youtubeLinkRegex, {
          message: '유효한 링크를 입력하세요.',
        }),
      })
    ),
    defaultValues: {
      link: initialLink ?? '',
    },
  });

  return (
    <Dialog
      open={open ?? true}
      onOpenChange={(open) => {
        !open && onClose();
      }}
    >
      <DialogContent className="w-[400px] bg-base-100">
        <DialogHeader>
          <DialogTitle>유튜브 링크 삽입</DialogTitle>
        </DialogHeader>
        <div>
          <TextInput
            {...register('link')}
            error={formState.isDirty && !formState.isValid}
            className="w-full flex-1 border-b border-base-content/30"
          />
          {formState.errors.link?.message ? (
            <div className="mt-2 text-xs text-error">
              {formState.errors.link.message}
            </div>
          ) : null}
        </div>
        {formState.isValid ? (
          <YoutubeEmbed
            link={getValues('link')}
            className="aspect-video w-full"
          />
        ) : null}
        <DialogFooter>
          <Button
            variant={'primary'}
            size={'sm'}
            onClick={handleSubmit(async ({ link }) => {
              onSave(link);
              onClose();
            })}
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
