import { Reaction, UserReaction } from '@/types/shared';
import { TRPCError } from '@trpc/server';

import { IPostRepository, postRepository } from '../post/post.repository';
import { Post } from '../post/post.type';
import { User } from '../user/user.repository.type';
import {
  IPostReactionRepository,
  postReactionRepository,
} from './post-reaction.repository';

export interface IPostReactionService {
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

class PostReactionService implements IPostReactionService {
  constructor(
    private postRepository: IPostRepository,
    private postReactionRepository: IPostReactionRepository
  ) {}

  public async countById(params: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<Reaction> {
    return this.postReactionRepository.countById(params);
  }

  public async upsert(params: {
    postId: Post['id'];
    userId: User['id'];
    type: UserReaction;
  }): Promise<Reaction> {
    const { postId } = params;
    const post = await this.postRepository.byId(postId);
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${postId}'`,
      });
    }

    return await this.postReactionRepository.upsert(params);
  }
}

export const postReactionService = new PostReactionService(
  postRepository,
  postReactionRepository
);
