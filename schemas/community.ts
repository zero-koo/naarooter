import { z } from 'zod';

export const MIN_COMMUNITY_NAME_LENGTH = 2;
export const MAX_COMMUNITY_NAME_LENGTH = 20;
export const MIN_COMMUNITY_DESCRIPTION_LENGTH = 2;
export const MAX_COMMUNITY_DESCRIPTION_LENGTH = 200;

export const communityNameSchema = z
  .string()
  .min(2, {
    message: `커뮤니티 이름은 최소 ${MIN_COMMUNITY_NAME_LENGTH}글자 이상이어야 합니다.`,
  })
  .max(MAX_COMMUNITY_NAME_LENGTH, {
    message: `커뮤니티 이름은 최대 ${MAX_COMMUNITY_NAME_LENGTH}글자 이내이어야 합니다.`,
  });

export const communityDescriptionSchema = z
  .string()
  .min(2, {
    message: `커뮤니티 설명은 최소 ${MIN_COMMUNITY_DESCRIPTION_LENGTH}글자 이상이어야 합니다.`,
  })
  .max(
    300,
    `커뮤니티 설명은 최대 ${MAX_COMMUNITY_DESCRIPTION_LENGTH}글자 이내이어야 합니다.`
  );

export const communityTopicsSchema = z
  .array(z.object({ id: z.string(), name: z.string() }))
  .min(1, { message: '최소 한개 이상의 주제를 선택해주세요.' })
  .max(3, { message: '주제는 최대 세개까지 선택 가능합니다.' });
