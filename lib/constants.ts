export const COMMUNITY_GROUP_MAP = {
  x: {
    id: 'x',
    title: '자유방',
  },
  e: {
    id: 'e',
    title: '외향방',
  },
  i: {
    id: 'i',
    title: '내향방',
  },
  s: {
    id: 's',
    title: '현실방',
  },
  n: {
    id: 'n',
    title: '이상방',
  },
  f: {
    id: 'f',
    title: '감성방',
  },
  t: {
    id: 't',
    title: '이성방',
  },
  j: {
    id: 'j',
    title: '계획방',
  },
  p: {
    id: 'p',
    title: '즉흥방',
  },
};

export type CommunityGroupId = keyof typeof COMMUNITY_GROUP_MAP;
