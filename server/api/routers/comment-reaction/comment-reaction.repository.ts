import { prisma } from '@/server/prisma';
import { Reaction, UserReaction } from '@/types/shared';
import { PrismaClient } from '@prisma/client';

import { CommentID } from '../comment/comment.type';
import { User } from '../user/user.repository.type';

export interface ICommentReactionRepository {
  getById(params: { commentId: CommentID; userId: User['id'] }): Promise<{
    id: number;
    type: 'like' | 'dislike';
  } | null>;
  countById(params: {
    commentId: CommentID;
    userId: User['id'] | null;
  }): Promise<Reaction>;
  upsert(params: {
    commentId: CommentID;
    userId: User['id'];
    type: UserReaction;
  }): Promise<Reaction>;
}

class CommentReactionRepository implements ICommentReactionRepository {
  constructor(private db: PrismaClient) {}

  public async getById({
    commentId,
    userId,
  }: {
    commentId: CommentID;
    userId: User['id'];
  }): Promise<{
    id: number;
    type: 'like' | 'dislike';
  } | null> {
    const [like, dislike] = await this.db.$transaction([
      this.db.commentLike.findUnique({
        where: {
          commentId_authorId: {
            commentId,
            authorId: userId,
          },
        },
      }),
      this.db.commentDislike.findUnique({
        where: {
          commentId_authorId: {
            commentId,
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
    commentId,
    userId,
  }: {
    commentId: CommentID;
    userId: User['id'] | null;
  }): Promise<Reaction> {
    const [likeCount, dislikeCount] = await this.db.$transaction([
      this.db.commentLike.count({
        where: {
          commentId,
        },
      }),
      this.db.commentDislike.count({
        where: {
          commentId,
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
      this.db.commentLike.findUnique({
        where: {
          commentId_authorId: {
            commentId,
            authorId: userId,
          },
        },
      }),
      this.db.commentDislike.findUnique({
        where: {
          commentId_authorId: {
            commentId,
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
    commentId,
    userId,
    type,
  }: {
    commentId: CommentID;
    userId: User['id'];
    type: UserReaction;
  }): Promise<Reaction> {
    switch (type) {
      case 'like': {
        await this.db.$transaction([
          this.db.commentLike.create({
            data: {
              commentId,
              authorId: userId,
            },
          }),
          this.db.commentDislike.deleteMany({
            where: {
              commentId,
              authorId: userId,
            },
          }),
        ]);
        break;
      }

      case 'dislike': {
        await this.db.$transaction([
          this.db.commentDislike.create({
            data: {
              commentId,
              authorId: userId,
            },
          }),
          this.db.commentLike.deleteMany({
            where: {
              commentId,
              authorId: userId,
            },
          }),
        ]);
        break;
      }

      default: {
        await this.db.$transaction([
          this.db.commentDislike.deleteMany({
            where: {
              commentId,
              authorId: userId,
            },
          }),
          this.db.commentLike.deleteMany({
            where: {
              commentId,
              authorId: userId,
            },
          }),
        ]);
      }
    }

    return this.countById({ commentId, userId });
  }
}

export const commentReactionRepository = new CommentReactionRepository(prisma);
