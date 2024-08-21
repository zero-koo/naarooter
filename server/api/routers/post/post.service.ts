import { TRPCError } from '@trpc/server';

import {
  IPostReactionRepository,
  postReactionRepository,
} from '../post-reaction/post-reaction.repository';
import { User } from '../user/user.repository.type';
import { IPostRepository, postRepository } from './post.repository';
import { PostRepositoryPayload } from './post.repository.type';
import {
  Post,
  PostCreateParams,
  PostListParams,
  PostUpdateParams,
} from './post.type';

export interface IPostService {
  list(params: PostListParams): Promise<Post[]>;
  byId(parmas: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<Post>;
  create(params: PostCreateParams): Promise<Post>;
  update(params: PostUpdateParams): Promise<Post>;
  delete(params: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<void>;
}

export class PostService implements IPostService {
  constructor(
    private postRepository: IPostRepository,
    private postReactionRepository: IPostReactionRepository
  ) {}

  public static repositoryPayloadToPost(payload: PostRepositoryPayload): Post {
    const { author, likeCount, dislikeCount, ...rest } = payload;
    return {
      ...rest,
      author: {
        ...author,
        isMe: false,
      },
      reaction: {
        likeCount,
        dislikeCount,
        selectedReaction: null,
      },
    };
  }

  private async refinePostWithUser(
    postPayload: PostRepositoryPayload,
    userId: User['id'] | null
  ): Promise<Post> {
    const { author, likeCount, dislikeCount, ...rest } = postPayload;
    const selectedReaction = userId
      ? (
          await this.postReactionRepository.getById({
            postId: postPayload.id,
            userId,
          })
        )?.type
      : null;

    return {
      ...rest,
      author: {
        ...author,
        isMe: author.id === userId,
      },
      reaction: {
        likeCount,
        dislikeCount,
        selectedReaction,
      },
    };
  }

  public async list({ userId, ...params }: PostListParams): Promise<Post[]> {
    const posts = await this.postRepository.list(params);
    return Promise.all(
      posts.map((post) => this.refinePostWithUser(post, userId))
    );
  }

  public async byId({
    postId,
    userId,
  }: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<Post> {
    const post = await this.postRepository.byId(postId);
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${postId}'`,
      });
    }

    // TODO!
    // Implement viewCount logics
    // in PostService
    // const updatedViewCount = await updateViewCount(
    //   id,
    //   String(ctx.req.headers['x-forwarded-for'])
    // );

    return this.refinePostWithUser(post, userId);
  }

  public async create({ input, userId }: PostCreateParams): Promise<Post> {
    const post = await this.postRepository.create({
      ...input,
      authorId: userId,
    });
    return this.refinePostWithUser(post, userId);
  }

  async update({ input, userId }: PostUpdateParams): Promise<Post> {
    const post = await this.postRepository.byId(input.postId);
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${input.postId}'`,
      });
    }
    if (post.author.id !== userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
    const postPayload = await this.postRepository.update(input);
    return this.refinePostWithUser(postPayload, userId);
  }

  public async delete({
    postId,
    userId,
  }: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<void> {
    const post = await this.postRepository.byId(postId);
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${postId}'`,
      });
    }
    if (post.author.id !== userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
    await this.postRepository.delete(postId);
    return;
  }
}

export const postService = new PostService(
  postRepository,
  postReactionRepository
);

// TODO: Replace in-memory cache
// const viewCountCache = new Set<string>();
// const VIEW_LIMIT_TIME = 5 * 60 * 1000; // 5 minutes
// async function updateViewCount(
//   postId: string,
//   userIP: string
// ): Promise<number | void> {
//   const cacheKey = `${postId}-${userIP}`;
//   if (viewCountCache.has(cacheKey)) return;

//   viewCountCache.add(cacheKey);
//   setTimeout(() => viewCountCache.delete(cacheKey), VIEW_LIMIT_TIME);

//   const { viewCount } = await prisma.post.update({
//     where: { id: postId },
//     data: {
//       viewCount: {
//         increment: 1,
//       },
//     },
//     select: {
//       viewCount: true,
//     },
//   });
//   return viewCount;
// }
