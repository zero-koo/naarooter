import { prisma } from '@/server/prisma';
import { PrismaClient } from '@prisma/client';

import { Post } from '../post/post.type';
import { User } from '../user/user.repository.type';
import {
  CommentCreateParams,
  CommentPrismaPayload,
  CommentRepositoryPayload,
  CommentUpdateParams,
  defaultCommentSelector,
} from './comment.repository.type';

type CommentID = CommentRepositoryPayload['id'];

export interface ICommentRepository {
  listByPostId(parmas: {
    postId: Post['id'];
    userId?: User['id'] | null;
    parentCommentId?: CommentID | null;
    cursorId?: CommentID | null;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<{
    comments: CommentRepositoryPayload[];
    count: number;
  }>;
  listByParentCommentId(params: {
    parentCommentId: CommentID;
    userId?: User['id'] | null;
    cursorId?: CommentID | null;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<{
    comments: CommentRepositoryPayload[];
    count: number;
  }>;
  countByPostId(postId: Post['id']): Promise<number>;
  countByParentCommentId(parentCommentId: CommentID): Promise<number>;
  byId(
    commentId: CommentID,
    userId?: User['id']
  ): Promise<CommentRepositoryPayload | null>;
  create(params: CommentCreateParams): Promise<CommentRepositoryPayload>;
  update(params: CommentUpdateParams): Promise<CommentRepositoryPayload>;
  delete(commentId: CommentID): Promise<void>;
}

class CommentRepository implements ICommentRepository {
  constructor(private db: PrismaClient) {}

  private payloadToComment(
    payload: CommentPrismaPayload,
    userId?: User['id'] | null
  ): CommentRepositoryPayload {
    const {
      id,
      author,
      content,
      createdAt,
      updatedAt,
      childComments,
      parentCommentId,
      status,
      targetUser,
      _count: {
        childComments: childCommentCount,
        commentLike: likeCount,
        commentDislike: dislikeCount,
      },
      commentLike,
      commentDislike,
    } = payload;

    return {
      id,
      author: {
        ...author,
        isMe: author.id === userId,
      },
      content,
      createdAt,
      updatedAt,
      childComments: childComments.map((child) => ({
        id: child.id,
        author: {
          ...child.author,
          isMe: child.author.id === userId,
        },
        content: child.content,
        createdAt: child.createdAt,
        updatedAt: child.updatedAt,
        parentCommentId: id,
        childCommentCount: child._count.childComments,
        reaction: {
          likeCount: child._count.commentLike,
          dislikeCount: child._count.commentDislike,
          selectedReaction:
            child.commentLike.length > 0
              ? 'like'
              : child.commentDislike.length > 0
                ? 'dislike'
                : null,
        },
        status: child.status,
        childComments: [],
        targetUser: child.targetUser,
      })),
      reaction: {
        likeCount,
        dislikeCount,
        selectedReaction:
          commentLike.length > 0
            ? 'like'
            : commentDislike.length > 0
              ? 'dislike'
              : null,
      },
      childCommentCount,
      parentCommentId,
      status,
      targetUser,
    };
  }

  public async listByPostId({
    postId,
    userId,
    parentCommentId,
    cursorId,
    limit = 10,
    order = 'desc',
  }: {
    postId: Post['id'];
    userId?: User['id'] | null;
    parentCommentId?: CommentID | null;
    cursorId?: CommentID;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<{
    comments: CommentRepositoryPayload[];
    count: number;
  }> {
    const [commentPayloads, count] = await this.db.$transaction([
      this.db.comment.findMany({
        select: defaultCommentSelector(userId),
        where: {
          postId,
          parentCommentId,
        },
        cursor: cursorId
          ? {
              id: cursorId,
            }
          : undefined,
        take: limit + (cursorId ? 2 : 1),
        orderBy: {
          createdAt: order,
        },
      }),
      this.db.comment.count({
        where: {
          postId,
        },
      }),
    ]);
    return {
      comments: commentPayloads.map((payload) =>
        this.payloadToComment(payload, userId)
      ),
      count,
    };
  }

  public async listByParentCommentId({
    parentCommentId,
    userId,
    cursorId,
    limit = 10,
    order = 'asc',
  }: {
    parentCommentId: CommentID;
    userId?: User['id'] | null;
    cursorId?: CommentID;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<{
    comments: CommentRepositoryPayload[];
    count: number;
  }> {
    const [commentPayloads, count] = await this.db.$transaction([
      this.db.comment.findMany({
        select: defaultCommentSelector(userId),
        where: {
          parentCommentId,
        },
        cursor: cursorId
          ? {
              id: cursorId,
            }
          : undefined,
        take: limit + (cursorId ? 2 : 1),
        orderBy: {
          createdAt: order,
        },
      }),
      this.db.comment.count({
        where: {
          parentCommentId,
        },
      }),
    ]);
    return {
      comments: commentPayloads.map((payload) =>
        this.payloadToComment(payload, userId)
      ),
      count,
    };
  }

  public countByPostId(postId: Post['id']): Promise<number> {
    return this.db.comment.count({
      where: {
        postId,
      },
    });
  }

  public countByParentCommentId(parentCommentId: CommentID): Promise<number> {
    return this.db.comment.count({
      where: {
        parentCommentId,
      },
    });
  }

  public async byId(
    commentId: CommentID,
    userId: User['id']
  ): Promise<CommentRepositoryPayload | null> {
    const commentPayload = await this.db.comment.findUnique({
      select: defaultCommentSelector(userId),
      where: {
        id: commentId,
      },
    });
    return commentPayload && this.payloadToComment(commentPayload, userId);
  }

  public async create(
    params: CommentCreateParams
  ): Promise<CommentRepositoryPayload> {
    const commentPayload = await this.db.comment.create({
      select: defaultCommentSelector(params.authorId),
      data: params,
    });
    return this.payloadToComment(commentPayload, params.authorId);
  }

  public async update(
    params: CommentUpdateParams
  ): Promise<CommentRepositoryPayload> {
    const { commentId, ...data } = params;
    const commentPayload = await this.db.comment.update({
      select: defaultCommentSelector(params.authorId),
      where: {
        id: commentId,
      },
      data: data,
    });
    return this.payloadToComment(commentPayload, params.authorId);
  }

  public async delete(commentId: CommentID): Promise<void> {
    return void (await this.db.comment.delete({
      where: {
        id: commentId,
      },
    }));
  }
}

export const commentRepository = new CommentRepository(prisma);
