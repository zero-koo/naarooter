import { z } from 'zod';

export const MIN_COMMUNITY_TITLE_LENGTH = 3;
export const MAX_COMMUNITY_TITLE_LENGTH = 100;

export const postTitleSchema = z
  .string()
  .min(1, { message: '제목을 입력하세요.' })
  .min(MIN_COMMUNITY_TITLE_LENGTH, {
    message: `제목은 최소 ${MIN_COMMUNITY_TITLE_LENGTH}자 이상이어야 합니다.`,
  })
  .max(MAX_COMMUNITY_TITLE_LENGTH, {
    message: `제목은 최대 ${MIN_COMMUNITY_TITLE_LENGTH}자 이내이어야 합니다.`,
  });
