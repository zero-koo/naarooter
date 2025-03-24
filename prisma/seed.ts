import { PrismaClient } from '@prisma/client';

import { randomInteger } from '../lib/utils';

const prisma = new PrismaClient();

const mbtis = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const;

type Poll = {
  id: string;
  title: string;
  contents: any;
  postId: string;
  choices: PollChoice[];
  comments: Comment[];
};

type PollChoice = {
  id: string;
  index: number;
  main: string;
};

type Comment = {
  authorId: string;
  content: string;
};

type CommunityTopic = {
  id: number;
  name: string;
  communityIds: string[];
};

const communityTopics: CommunityTopic[] = ['취미', 'MBTI'].map((name, id) => ({
  id,
  name,
  communityIds: [],
}));

type Community = {
  id: string;
  name: string;
  topicId: number;
};

const communities: Community[] = [
  {
    id: 'x',
    name: '자유방',
  },
  {
    id: 'e',
    name: '외향방',
  },
  {
    id: 'i',
    name: '내향방',
  },
  {
    id: 's',
    name: '현실방',
  },
  {
    id: 'n',
    name: '이상방',
  },
  {
    id: 'f',
    name: '감성방',
  },
  {
    id: 't',
    name: '이성방',
  },
  {
    id: 'j',
    name: '계획방',
  },
  {
    id: 'p',
    name: '즉흥방',
  },
].map((c) => ({ ...c, topicId: 1 }));

const polls: Readonly<Record<string, Poll>> = {
  'c84d8367-460a-4772-b2dd-42170110d774': {
    id: 'c84d8367-460a-4772-b2dd-42170110d774',
    postId: '40dab068-67fd-4d9c-8728-f525025b3153',
    title: '혈액형 vs MBTI',
    contents:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"혈액형은 성격과 관련이 있을까?","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    choices: [
      {
        id: '36bf06ca-853c-4729-b1bf-a7ee5968059d',
        index: 0,
        main: 'A형',
      },
      {
        id: 'cd90f625-d40b-4964-9fa0-b1857cb8ec4e',
        index: 1,
        main: 'B형',
      },
      {
        id: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
        index: 2,
        main: 'O형',
      },
      {
        id: 'bf02d7ef-e916-41ed-a36f-0efc9c8cefd2',
        index: 3,
        main: 'AB형',
      },
    ],
    comments: [],
  },
  '0249a98f-b570-4e04-b89c-950e13650bc8': {
    id: '0249a98f-b570-4e04-b89c-950e13650bc8',
    postId: 'a687f3bd-055e-4a57-aa48-48f4b395a7b0',
    title: '김치찌개 vs 된장찌개',
    contents:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    choices: [
      {
        id: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
        index: 0,
        main: '김치찌개',
      },
      {
        id: '2a3f12be-2a93-42e6-abe2-3f677e544349',
        index: 1,
        main: '된장찌개',
      },
    ],
    comments: [],
  },
  'fc0fc980-94c2-481c-930f-06a7c2dee1ba': {
    id: 'fc0fc980-94c2-481c-930f-06a7c2dee1ba',
    postId: '82545c2a-f417-47dc-9a6d-cd8f87d858c7',
    title: '시험 컨닝해본적 있다 / 없다',
    contents:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    choices: [
      {
        id: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
        index: 0,
        main: '있다',
      },
      {
        id: 'df939951-da0f-4686-a86c-76a185e2da56',
        index: 1,
        main: '없다',
      },
    ],
    comments: [],
  },
  '6fb35c63-1b55-4e53-bf31-98e198d28667': {
    id: '6fb35c63-1b55-4e53-bf31-98e198d28667',
    postId: 'ebb93193-880f-418d-b531-39a2a61c10b3',
    title: '민트초코 호불호',
    contents:
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    choices: [
      {
        id: '2c882f62-f9d4-491d-b4ca-74ade4a5bc49',
        index: 0,
        main: '호',
      },
      {
        id: '4b6b9586-6224-4b4a-9299-459ea28c259a',
        index: 1,
        main: '불호',
      },
    ],
    comments: [],
  },
};

type PostSeed = {
  communityId: string;
  title: string;
  description: string;
};

const posts: PostSeed[] = [
  {
    communityId: 'i',
    title: 'INTP 모여라!',
    description: '손?!',
  },
  {
    communityId: 'i',
    title: 'ISFJ 모여라!',
    description: '우리 존재 화이팅!',
  },
  {
    communityId: 'i',
    title: 'INFP 모여라!',
    description: '손?!',
  },
  {
    communityId: 'e',
    title: 'ESTJ 모여라!',
    description: '손?!',
  },
];

const createVotes = () =>
  Object.values(polls).map((poll) => ({
    pollId: poll.id,
    pollChoiceId: poll.choices[randomInteger(poll.choices.length - 1)].id,
  }));

async function seedDefaultData() {
  await Promise.all(
    communityTopics.map(async ({ id, name }) => {
      return prisma.communityTopic.create({
        data: {
          id,
          name,
        },
      });
    })
  );

  await prisma.user.create({
    data: {
      id: 'clydwekn1000008la5qsv5l01',
      email: 'sample@gmail.com',
      name: 'DEV_ACCOUNT',
      mbti: 'INTP',
    },
  });

  communities.forEach(async ({ id, name }) => {
    await prisma.community.upsert({
      where: {
        id,
      },
      update: {},
      create: {
        id,
        name,
        ownerId: 'clydwekn1000008la5qsv5l01',
        topics: {
          connect: { id: 1 },
        },
      },
    });
  });

  await prisma.user.upsert({
    where: { email: 'dev_account@gmail.com' },
    update: {},
    create: {
      id: 'clydwekn1000008la5qsv5l0t',
      email: 'dev_account@gmail.com',
      name: '질문봇',
      mbti: 'INTP',
      posts: {
        create: Object.values(polls).map((poll) => {
          return {
            id: poll.postId,
            title: poll.title,
            description: poll.contents,
            communityId: 'x',
            type: 'POLL',
            poll: {
              create: {
                id: poll.id,
                choices: { create: poll.choices },
              },
            },
          };
        }),
      },
      votes: {
        create: createVotes(),
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'dev_account+0@gmail.com' },
    update: {},
    create: {
      id: 'clydwfjqi000108la110h1bqe',
      email: 'dev_account+0@gmail.com',
      name: '운영자',
      mbti: 'ESFJ',
      posts: {
        create: posts.map((post) => ({
          type: 'POST',
          ...post,
          description: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${post.description}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
        })),
      },
      votes: {
        create: createVotes(),
      },
    },
  });

  for (let i = 1; i < 100; i++) {
    await prisma.user.upsert({
      where: { email: `dev_account+${i}@gmail.com` },
      update: {},
      create: {
        email: `dev_account+${i}@gmail.com`,
        name: `dev_name+${i}`,
        mbti: mbtis[randomInteger(16)],
        votes: {
          create: createVotes(),
        },
      },
    });
  }
}
seedDefaultData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
