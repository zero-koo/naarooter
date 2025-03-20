import { UserID } from '../user/user.type';
import { CommunityRepositoryPayload } from './community.repository.type';

export type CommunityID = CommunityRepositoryPayload['id'];

export type Community = Pick<
  CommunityRepositoryPayload,
  'id' | 'name' | 'description' | 'topicId' | 'ownerId'
>;

export type CommunityListParams = {
  topicId?: number;
  limit?: number;
  userId?: UserID;
  lastId?: CommunityID;
};

export type CommunityCreateParams = {
  name: string;
  description: string;
  ownerId: UserID;
  topicId: number;
};

export type CommunityUpdateParams = {
  id: CommunityID;
  name?: string;
  description?: string;
  ownerId?: UserID;
  topicId?: number;
};
