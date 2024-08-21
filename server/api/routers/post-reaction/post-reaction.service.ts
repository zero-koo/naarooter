import { Reaction, UserReaction } from '@/types/shared';
import { TRPCError } from '@trpc/server';

import { IPostRepository, postRepository } from '../post/post.repository';
import { PostID } from '../post/post.type';
import { UserID } from '../user/user.type';
import {
  IPostReactionRepository,
  postReactionRepository,
} from './post-reaction.repository';

export interface IPostReactionService {
  countById(params: {
    postId: PostID;
    userId: UserID | null;
  }): Promise<Reaction>;
  upsert(params: {
    postId: PostID;
    userId: UserID;
    type: UserReaction;
  }): Promise<Reaction>;
}

class PostReactionService implements IPostReactionService {
  constructor(
    private postRepository: IPostRepository,
    private postReactionRepository: IPostReactionRepository
  ) {}

  public async countById(params: {
    postId: PostID;
    userId: UserID | null;
  }): Promise<Reaction> {
    return this.postReactionRepository.countById(params);
  }

  public async upsert({
    postId,
    userId,
    type,
  }: {
    postId: PostID;
    userId: UserID;
    type: UserReaction;
  }): Promise<Reaction> {
    const post = await this.postRepository.byId({
      id: postId,
      userId,
    });
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${postId}'`,
      });
    }

    return await this.postReactionRepository.upsert({
      postId,
      userId,
      type,
    });
  }
}

export const postReactionService = new PostReactionService(
  postRepository,
  postReactionRepository
);
