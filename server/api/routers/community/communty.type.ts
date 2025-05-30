import { UserID } from '../user/user.type';
import { CommunityRepositoryPayload } from './community.repository.type';

export type CommunityID = CommunityRepositoryPayload['id'];

export type Community = Pick<
  CommunityRepositoryPayload,
  | 'id'
  | 'name'
  | 'description'
  | 'topics'
  | 'numUsers'
  | 'iconUrl'
  | 'bannerUrl'
> & {
  isOwner: boolean;
};

export type CommunityListParams = {
  topicId?: string;
  limit?: number;
  userId?: UserID;
  lastId?: CommunityID;
};

export type CommunityCreateParams = {
  name: string;
  description: string;
  userId: UserID;
  topicIds: string[];
  iconUrl?: string;
  bannerUrl?: string;
};

export type CommunityUpdateParams = {
  id: CommunityID;
  name?: string;
  description?: string;
  userId?: UserID;
  topicIds?: string[];
  iconUrl?: string;
  bannerUrl?: string;
};
