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

export function formatTimeAgo(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

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

export function countReactions(
  reactions: Array<{ authorId: string; reactionType: 'like' | 'dislike' }>,
  userId: string | null
): {
  userSelection: 'like' | 'dislike' | null;
  likeCount: number;
  dislikeCount: number;
} {
  return reactions.reduce(
    (accum, { authorId, reactionType }) => {
      return {
        ...accum,
        userSelection: authorId === userId ? reactionType : accum.userSelection,
        likeCount:
          reactionType === 'like' ? accum.likeCount + 1 : accum.likeCount,
        dislikeCount:
          reactionType === 'dislike'
            ? accum.dislikeCount + 1
            : accum.dislikeCount,
      };
    },
    {
      userSelection: null as 'like' | 'dislike' | null,
      likeCount: 0,
      dislikeCount: 0,
    }
  );
}
