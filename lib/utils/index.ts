import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatter = new Intl.RelativeTimeFormat('ko', {
  numeric: 'auto',
});

const DIVISIONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
] as const;

export function formatTimeAgo(date: Date | string | number) {
  const d = date instanceof Date ? date : new Date(date);
  let duration = (d.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}

export function randomInteger(max = 100, min = 0): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function nextTick(callback?: () => any) {
  return new Promise((resolve) =>
    requestAnimationFrame(() => {
      callback?.();
      resolve(undefined);
    })
  );
}

export function uploadFile({
  maxCount = 1,
  accept,
  onUpload,
}: {
  maxCount?: number;
  accept: string;
  onUpload?: (file: File[]) => void;
}): Promise<File[]> {
  const inputElem = document.createElement('input');
  inputElem.type = 'file';
  inputElem.multiple = maxCount > 1;
  inputElem.maxLength = maxCount;
  inputElem.accept = accept;

  inputElem.click();
  inputElem.remove();
  return new Promise((resolve) => {
    inputElem.addEventListener('change', handleFiles);

    function handleFiles(e: Event) {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      onUpload?.(Array.from(files).slice(0, maxCount));
      resolve(Array.from(files).slice(0, maxCount));

      inputElem.removeEventListener('change', handleFiles);
    }
  });
}

export function uploadImages({
  maxCount = 1,
  onUpload,
}: {
  maxCount: number;
  onUpload?: (file: File[]) => void;
}) {
  return uploadFile({ accept: 'image/*', maxCount, onUpload });
}

export function countReactions(
  reactions: Array<{ authorId: string; reactionType: 'like' | 'dislike' }>,
  userId: string | null
): {
  userReaction: 'like' | 'dislike' | null;
  likeCount: number;
  dislikeCount: number;
} {
  return reactions.reduce(
    (accum, { authorId, reactionType }) => {
      return {
        ...accum,
        userReaction: authorId === userId ? reactionType : accum.userReaction,
        likeCount:
          reactionType === 'like' ? accum.likeCount + 1 : accum.likeCount,
        dislikeCount:
          reactionType === 'dislike'
            ? accum.dislikeCount + 1
            : accum.dislikeCount,
      };
    },
    {
      userReaction: null as 'like' | 'dislike' | null,
      likeCount: 0,
      dislikeCount: 0,
    }
  );
}
