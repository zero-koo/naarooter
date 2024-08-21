import { TRPCError } from '@trpc/server';

import { UserID } from '../user/user.type';
import { IPostRepository, postRepository } from './post.repository';
import { PostRepositoryPayload } from './post.repository.type';
import {
  Post,
  PostCreateParams,
  PostID,
  PostListParams,
  PostUpdateParams,
} from './post.type';

export interface IPostService {
  list(params: PostListParams): Promise<Post[]>;
  byId(parmas: { postId: PostID; userId: UserID | null }): Promise<Post>;
  create(params: PostCreateParams): Promise<Post>;
  update(params: PostUpdateParams): Promise<Post>;
  delete(params: { postId: PostID; userId: UserID | null }): Promise<void>;
}

export class PostService implements IPostService {
  constructor(private postRepository: IPostRepository) {}

  public static repositoryPayloadToPost(
    payload: PostRepositoryPayload,
    userId: UserID | null
  ): Post {
    const { author, ...rest } = payload;
    return {
      ...rest,
      author: {
        ...author,
        isMe: author.id === userId,
      },
    };
  }

  public async list(params: PostListParams): Promise<Post[]> {
    const posts = await this.postRepository.list(params);
    return posts.map((post) =>
      PostService.repositoryPayloadToPost(post, params.userId)
    );
  }

  public async byId({
    postId,
    userId,
  }: {
    postId: PostID;
    userId: UserID | null;
  }): Promise<Post> {
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

    // TODO!
    // Implement viewCount logics
    // in PostService
    // const updatedViewCount = await updateViewCount(
    //   id,
    //   String(ctx.req.headers['x-forwarded-for'])
    // );

    return PostService.repositoryPayloadToPost(post, userId);
  }

  public async create({ input, userId }: PostCreateParams): Promise<Post> {
    const post = await this.postRepository.create({
      ...input,
      authorId: userId,
    });
    return PostService.repositoryPayloadToPost(post, userId);
  }

  async update({ input, userId }: PostUpdateParams): Promise<Post> {
    const post = await this.postRepository.byId({
      id: input.postId,
      userId,
    });
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
    const postPayload = await this.postRepository.update({
      ...input,
      userId,
    });
    return PostService.repositoryPayloadToPost(postPayload, userId);
  }

  public async delete({
    postId,
    userId,
  }: {
    postId: PostID;
    userId: UserID | null;
  }): Promise<void> {
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
    if (post.author.id !== userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
    await this.postRepository.delete(postId);
    return;
  }
}

export const postService = new PostService(postRepository);

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
