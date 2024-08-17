import { TRPCError } from '@trpc/server';

import { IPostRepository, postRepository } from '../post/post.repository';
import { Post } from '../post/post.type';
import { User } from '../user/user.repository.type';
import { commentRepository, ICommentRepository } from './comment.repository';
import {
  Comment,
  CommentCreateParams,
  CommentID,
  CommentUpdateParams,
} from './comment.type';

export interface ICommentService {
  listByPostId(parmas: {
    postId: Post['id'];
    userId?: User['id'] | null;
    parentCommentId?: CommentID | null
    cursorId?: CommentID | null;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<{
    comments: Comment[];
    count: number;
  }>;
  listByParentCommentId(params: {
    parentCommentId: CommentID;
    userId?: User['id'] | null;
    cursorId?: CommentID | null;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<{
    comments: Comment[];
    count: number;
  }>;
  countByPostId(postId: Post['id']): Promise<number>;
  byId(params: {
    commentId: CommentID;
    userId: User['id'];
  }): Promise<Comment | null>;
  create(params: CommentCreateParams): Promise<Comment>;
  update(params: CommentUpdateParams): Promise<Comment>;
  delete(params: {
    commentId: CommentID;
    userId: User['id'];
  }): Promise<Comment | void>;
}

class CommentService implements ICommentService {
  constructor(
    private postRepository: IPostRepository,
    private commentRepository: ICommentRepository
  ) {}

  private async checkPostExist(postId: Post['id']): Promise<void> {
    const post = await this.postRepository.byId(postId);
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${postId}'`,
      });
    }
  }

  public async listByPostId(params: {
    postId: Post['id'];
    parentCommentId: CommentID | null
    userId?: User['id'] | null;
    cursorId?: CommentID | null;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<{
    comments: Comment[];
    count: number;
  }> {
    this.checkPostExist(params.postId);
    return await this.commentRepository.listByPostId(params);
  }

  public async listByParentCommentId(params: {
    parentCommentId: CommentID;
    userId?: User['id'] | null;
    cursorId?: CommentID | null;
    limit?: number;
    order?: 'asc' | 'desc';
  }): Promise<{
    comments: Comment[];
    count: number;
  }> {
    await this.byId({ commentId: params.parentCommentId });
    return await this.commentRepository.listByParentCommentId(params);
  }

  public async countByPostId(postId: Post['id']): Promise<number> {
    return await this.commentRepository.countByPostId(postId);
  }

  public async byId({
    commentId,
    userId,
  }: {
    commentId: CommentID;
    userId?: User['id'];
  }): Promise<Comment> {
    const comment = await this.commentRepository.byId(commentId, userId);
    if (!comment) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No comment with id '${commentId}'`,
      });
    }
    return comment;
  }

  public async create(params: CommentCreateParams): Promise<Comment> {
    this.checkPostExist(params.postId);
    return await this.commentRepository.create(params);
  }

  public async update(params: CommentUpdateParams): Promise<Comment> {
    void this.byId({ commentId: params.commentId });
    return await this.commentRepository.update(params);
  }

  public async delete({
    commentId,
    userId,
  }: {
    commentId: CommentID;
    userId: User['id'];
  }): Promise<Comment | void> {
    void this.byId({ commentId });

    const childCommentCount =
      await this.commentRepository.countByParentCommentId(commentId);

    if (childCommentCount > 0) {
      return await this.commentRepository.update({
        commentId,
        authorId: userId,
        status: 'deleted',
      });
    }
    return await this.commentRepository.delete(commentId);
  }
}

export const commentService = new CommentService(
  postRepository,
  commentRepository
);
