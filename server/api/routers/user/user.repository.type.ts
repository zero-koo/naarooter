import { Prisma } from '@prisma/client';

export const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  name: true,
  mbti: true,
  image: true,
  status: true,
});

export type User = Prisma.UserGetPayload<{ select: typeof defaultUserSelect }>;

export type UpdateUserParams = {
  userId: User['id'];
} & Partial<Pick<User, 'image' | 'name' | 'mbti'>>;
