import { prisma } from '@/server/prisma';
import { Reaction, UserReaction } from '@/types/shared';
import { PrismaClient } from '@prisma/client';

import { Post } from '../post/post.type';
import { User } from '../user/user.repository.type';

export interface IPostReactionRepository {
  getById(params: { postId: Post['id']; userId: User['id'] }): Promise<{
    id: number;
    type: 'like' | 'dislike';
  } | null>;
  countById(params: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<Reaction>;
  upsert(params: {
    postId: Post['id'];
    userId: User['id'];
    type: UserReaction;
  }): Promise<Reaction>;
}

class PostReactionRepository implements IPostReactionRepository {
  constructor(private db: PrismaClient) {}

  public async getById({
    postId,
    userId,
  }: {
    postId: Post['id'];
    userId: User['id'];
  }): Promise<{
    id: number;
    type: 'like' | 'dislike';
  } | null> {
    const [like, dislike] = await this.db.$transaction([
      this.db.postLike.findUnique({
        where: {
          postId_authorId: {
            postId,
            authorId: userId,
          },
        },
      }),
      this.db.postDislike.findUnique({
        where: {
          postId_authorId: {
            postId,
            authorId: userId,
          },
        },
      }),
    ]);

    if (like) {
      return {
        id: like.id,
        type: 'like',
      };
    }

    if (dislike) {
      return {
        id: dislike.id,
        type: 'dislike',
      };
    }

    return null;
  }

  public async countById({
    postId,
    userId,
  }: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<Reaction> {
    const [likeCount, dislikeCount] = await this.db.$transaction([
      this.db.postLike.count({
        where: {
          postId,
        },
      }),
      this.db.postDislike.count({
        where: {
          postId,
        },
      }),
    ]);

    if (!userId) {
      return {
        likeCount,
        dislikeCount,
        selectedReaction: null,
      };
    }

    const [selectedLike, selectedDislike] = await this.db.$transaction([
      this.db.postLike.findUnique({
        where: {
          postId_authorId: {
            postId,
            authorId: userId,
          },
        },
      }),
      this.db.postLike.findUnique({
        where: {
          postId_authorId: {
            postId,
            authorId: userId,
          },
        },
      }),
    ]);

    return {
      likeCount,
      dislikeCount,
      selectedReaction: selectedLike
        ? 'like'
        : selectedDislike
          ? 'dislike'
          : null,
    };
  }

  public async upsert({
    postId,
    userId,
    type,
  }: {
    postId: Post['id'];
    userId: User['id'];
    type: UserReaction;
  }): Promise<Reaction> {
    switch (type) {
      case 'like': {
        await this.db.$transaction([
          this.db.postLike.create({
            data: {
              postId,
              authorId: userId,
            },
          }),
          this.db.postDislike.deleteMany({
            where: {
              postId,
              authorId: userId,
            },
          }),
        ]);
        break;
      }

      case 'dislike': {
        await this.db.$transaction([
          this.db.postDislike.create({
            data: {
              postId,
              authorId: userId,
            },
          }),
          this.db.postLike.deleteMany({
            where: {
              postId,
              authorId: userId,
            },
          }),
        ]);
        break;
      }

      default: {
        await this.db.$transaction([
          this.db.postDislike.deleteMany({
            where: {
              postId,
              authorId: userId,
            },
          }),
          this.db.postLike.deleteMany({
            where: {
              postId,
              authorId: userId,
            },
          }),
        ]);
      }
    }

    return this.countById({ postId, userId });
  }
}

export const postReactionRepository = new PostReactionRepository(prisma);
