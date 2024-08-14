import { prisma } from '@/server/prisma';

import {
  defaultUserSelect,
  UpdateUserParams,
  User,
} from './user.repository.type';

interface IUserRepository {
  getById(id: User['id']): Promise<User>;
  updateUserById(params: UpdateUserParams): Promise<User>;
  withdraw(id: User['id']): Promise<User>;
}

class UserRepository implements IUserRepository {
  async getById(id: User['id']): Promise<User> {
    return await prisma.user.findUniqueOrThrow({
      select: defaultUserSelect,
      where: {
        id,
      },
    });
  }

  async updateUserById(params: UpdateUserParams): Promise<User> {
    const { userId, ...data } = params;
    return await prisma.user.update({
      select: defaultUserSelect,
      where: {
        id: userId,
      },
      data,
    });
  }

  async withdraw(id: User['id']): Promise<User> {
    return prisma.user.update({
      select: defaultUserSelect,
      where: {
        id,
      },
      data: {
        email: undefined,
        name: undefined,
        status: 'DELETED',
      },
    });
  }
}

export const userRepository = new UserRepository();
