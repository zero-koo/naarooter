import { CommentRepositoryPayload } from './comment.repository.type';

export type {
  CommentCreateParams,
  CommentUpdateParams,
} from './comment.repository.type';

export type Comment = CommentRepositoryPayload;
export type CommentID = Comment['id'];
