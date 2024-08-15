import { TRPCError } from '@trpc/server';

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

class PostService implements IPostService {
  constructor(private _postRepository: IPostRepository) {}

  private checkAuthor(
    postPayload: PostRepositoryPayload,
    userId: User['id'] | null
  ): Post {
    const { author, ...rest } = postPayload;
    return {
      ...rest,
      author: {
        ...author,
        isMe: author.id === userId,
      },
    };
  }

  public async list({ userId, ...params }: PostListParams): Promise<Post[]> {
    const posts = await this._postRepository.list(params);
    return posts.map((post) => this.checkAuthor(post, userId));
  }

  public async byId({
    postId,
    userId,
  }: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<Post> {
    const post = await this._postRepository.byId(postId);
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${userId}'`,
      });
    }

    // TODO!
    // Implement viewCount logics
    // in PostService
    // const updatedViewCount = await updateViewCount(
    //   id,
    //   String(ctx.req.headers['x-forwarded-for'])
    // );

    return this.checkAuthor(post, userId);
  }

  public async create({ input, userId }: PostCreateParams): Promise<Post> {
    const post = await this._postRepository.create({
      ...input,
      authorId: userId,
    });
    return this.checkAuthor(post, userId);
  }

  async update({ input, userId }: PostUpdateParams): Promise<Post> {
    const post = await this._postRepository.byId(input.postId);
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
    const postPayload = await this._postRepository.update(input);
    return this.checkAuthor(postPayload, userId);
  }

  public async delete({
    postId,
    userId,
  }: {
    postId: Post['id'];
    userId: User['id'] | null;
  }): Promise<void> {
    const post = await this._postRepository.byId(postId);
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
    await this._postRepository.delete(postId);
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
