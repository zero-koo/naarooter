import { prisma } from '@/server/prisma';
import { PrismaClient } from '@prisma/client';

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
  constructor(private db: PrismaClient) {}

  async getById(id: User['id']): Promise<User> {
    return await this.db.user.findUniqueOrThrow({
      select: defaultUserSelect,
      where: {
        id,
      },
    });
  }

  async updateUserById(params: UpdateUserParams): Promise<User> {
    const { userId, ...data } = params;
    return await this.db.user.update({
      select: defaultUserSelect,
      where: {
        id: userId,
      },
      data,
    });
  }

  async withdraw(id: User['id']): Promise<User> {
    return this.db.user.update({
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

export const userRepository = new UserRepository(prisma);
