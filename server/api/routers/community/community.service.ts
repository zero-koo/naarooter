import { UserID } from '../user/user.type';
import {
  communityRepository,
  ICommunityRepository,
} from './community.repository';
import { CommunityRepositoryPayload } from './community.repository.type';
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
  withdraw(params: { communityId: CommunityID; userId: UserID }): Promise<void>;
  hasUser(params: {
    communityId: CommunityID;
    userId: UserID;
  }): Promise<boolean>;
  checkName({ name }: { name: string }): Promise<{ exist: boolean }>;
  topics(): Promise<{ topics: Array<{ id: string; name: string }> }>;
}

export class CommunityService implements ICommunityService {
  constructor(private communityRepository: ICommunityRepository) {}

  public static repositoryPayloadToPost(
    payload: CommunityRepositoryPayload,
    userId?: UserID | null
  ): Community {
    const { ownerId, ...rest } = payload;
    return {
      ...rest,
      isOwner: ownerId === userId,
    };
  }

  async list(params: CommunityListParams): Promise<Community[]> {
    const communities = await this.communityRepository.list(params);
    return communities.map((community) =>
      CommunityService.repositoryPayloadToPost(community, params.userId)
    );
  }
  async byId({
    id,
    userId,
  }: {
    id: CommunityID;
    userId?: UserID | null;
  }): Promise<Community | null> {
    const community = await this.communityRepository.byId({ id });
    if (!community) return null;
    return CommunityService.repositoryPayloadToPost(community, userId);
  }
  async create(params: CommunityCreateParams): Promise<Community> {
    const community = await this.communityRepository.create(params);
    return CommunityService.repositoryPayloadToPost(community, params.userId);
  }
  async update(params: CommunityUpdateParams): Promise<Community> {
    const community = await this.communityRepository.update(params);
    return CommunityService.repositoryPayloadToPost(community, params.userId);
  }
  delete(id: CommunityID): Promise<void> {
    return this.communityRepository.delete(id);
  }
  join(params: { communityId: CommunityID; userId: UserID }): Promise<void> {
    return this.communityRepository.join(params);
  }
  withdraw(params: {
    communityId: CommunityID;
    userId: UserID;
  }): Promise<void> {
    return this.communityRepository.withdraw(params);
  }
  hasUser(params: { communityId: CommunityID; userId: UserID }) {
    return this.communityRepository.hasUser(params);
  }
  async checkName({ name }: { name: string }): Promise<{ exist: boolean }> {
    const community = await this.communityRepository.byName({ name });
    return {
      exist: !!community,
    };
  }
  topics(): Promise<{ topics: Array<{ id: string; name: string }> }> {
    return this.communityRepository.topics();
  }
}

export const communityService = new CommunityService(communityRepository);
