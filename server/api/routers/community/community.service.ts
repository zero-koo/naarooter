import { UserID } from '../user/user.type';
import {
  communityRepository,
  ICommunityRepository,
} from './community.repository';
import {
  Community,
  CommunityCreateParams,
  CommunityID,
  CommunityListParams,
  CommunityUpdateParams,
} from './communty.type';

export interface ICommunityService {
  list(params: CommunityListParams): Promise<Community[]>;
  byId({ id }: { id: CommunityID }): Promise<Community | null>;
  create(params: CommunityCreateParams): Promise<Community>;
  update(params: CommunityUpdateParams): Promise<Community>;
  delete(id: CommunityID): Promise<void>;
  join(params: { communityId: CommunityID; userId: UserID }): Promise<void>;
  checkName({ name }: { name: string }): Promise<{ exist: boolean }>;
}

export class CommunityService implements ICommunityService {
  constructor(private communityRepository: ICommunityRepository) {}

  list(params: CommunityListParams): Promise<Community[]> {
    return this.communityRepository.list(params);
  }
  byId({ id }: { id: CommunityID }): Promise<Community | null> {
    return this.communityRepository.byId({ id });
  }
  create(params: CommunityCreateParams): Promise<Community> {
    return this.communityRepository.create(params);
  }
  update(params: CommunityUpdateParams): Promise<Community> {
    return this.communityRepository.update(params);
  }
  delete(id: CommunityID): Promise<void> {
    return this.communityRepository.delete(id);
  }
  join(params: { communityId: CommunityID; userId: UserID }): Promise<void> {
    return this.communityRepository.join(params);
  }
  async checkName({ name }: { name: string }): Promise<{ exist: boolean }> {
    const community = await this.communityRepository.byName({ name });
    return {
      exist: !!community,
    };
  }
}

export const communityService = new CommunityService(communityRepository);
