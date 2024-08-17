import { Reaction, UserReaction } from '@/types/shared';
import { TRPCError } from '@trpc/server';

import {
  commentRepository,
  ICommentRepository,
} from '../comment/comment.repository';
import { Comment } from '../comment/comment.type';
import { User } from '../user/user.repository.type';
import {
  commentReactionRepository,
  ICommentReactionRepository,
} from './comment-reaction.repository';

export interface ICommentReactionService {
  countById(params: {
    commentId: Comment['id'];
    userId: User['id'] | null;
  }): Promise<Reaction>;
  upsert(params: {
    commentId: Comment['id'];
    userId: User['id'];
    type: UserReaction;
  }): Promise<Reaction>;
}

class CommentReactionService implements ICommentReactionService {
  constructor(
    private commentRepository: ICommentRepository,
    private commentReactionRepository: ICommentReactionRepository
  ) {}

  public async countById(params: {
    commentId: Comment['id'];
    userId: User['id'] | null;
  }): Promise<Reaction> {
    return this.commentReactionRepository.countById(params);
  }

  public async upsert(params: {
    commentId: Comment['id'];
    userId: User['id'];
    type: UserReaction;
  }): Promise<Reaction> {
    const { commentId } = params;
    const comment = await this.commentRepository.byId(commentId);
    if (!comment) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No comment with id '${commentId}'`,
      });
    }

    return await this.commentReactionRepository.upsert(params);
  }
}

export const commentReactionService = new CommentReactionService(
  commentRepository,
  commentReactionRepository
);
