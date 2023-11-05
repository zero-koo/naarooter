import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: 'berksmile@gmail.com' },
    update: {},
    create: {
      id: 'user_2XWzthp7ZkYUJsVJGVfqsDfBrHR',
      email: 'berksmile@gmail.com',
      mbti: 'INTP',
      polls: {
        create: [
          {
            id: 'c84d8367-460a-4772-b2dd-42170110d774',
            title: '혈액형 vs MBTI',
            description: '혈액형은 성격과 관련이 있을까?',
            choices: {
              create: [
                {
                  id: '36bf06ca-853c-4729-b1bf-a7ee5968059d',
                  index: 0,
                  main: 'A형',
                  sub: '',
                },
                {
                  id: 'cd90f625-d40b-4964-9fa0-b1857cb8ec4e',
                  index: 1,
                  main: 'B형',
                  sub: '',
                },
                {
                  id: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
                  index: 2,
                  main: 'O형',
                  sub: '',
                },
                {
                  id: 'bf02d7ef-e916-41ed-a36f-0efc9c8cefd2',
                  index: 3,
                  main: 'AB형',
                  sub: '',
                },
              ],
            },
          },
          {
            id: '0249a98f-b570-4e04-b89c-950e13650bc8',
            title: '김치찌개 vs 된장찌개',
            description: '',
            choices: {
              create: [
                {
                  id: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
                  index: 0,
                  main: '김치찌개',
                  sub: '',
                },
                {
                  id: '2a3f12be-2a93-42e6-abe2-3f677e544349',
                  index: 1,
                  main: '된장찌개',
                  sub: '',
                },
              ],
            },
          },
          {
            id: 'fc0fc980-94c2-481c-930f-06a7c2dee1ba',
            title: '시험 컨닝해본적 있다 / 없다',
            description: '',
            choices: {
              create: [
                {
                  id: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
                  index: 0,
                  main: '있다',
                  sub: '',
                },
                {
                  id: 'df939951-da0f-4686-a86c-76a185e2da56',
                  index: 1,
                  main: '없다',
                  sub: '',
                },
              ],
            },
          },
          {
            id: '6fb35c63-1b55-4e53-bf31-98e198d28667',
            title: '민트초코 호불호',
            description: '',
            choices: {
              create: [
                {
                  id: '2c882f62-f9d4-491d-b4ca-74ade4a5bc49',
                  index: 0,
                  main: '호',
                  sub: '',
                },
                {
                  id: '4b6b9586-6224-4b4a-9299-459ea28c259a',
                  index: 1,
                  main: '불호',
                  sub: '',
                },
              ],
            },
          },
        ],
      },
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: 'bf02d7ef-e916-41ed-a36f-0efc9c8cefd2',
          },
          {
            pollId: '0249a98f-b570-4e04-b89c-950e13650bc8',
            pollChoiceId: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
          },
          {
            pollId: 'fc0fc980-94c2-481c-930f-06a7c2dee1ba',
            pollChoiceId: '2c882f62-f9d4-491d-b4ca-74ade4a5bc49',
          },
          {
            pollId: '6fb35c63-1b55-4e53-bf31-98e198d28667',
            pollChoiceId: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
          },
        ],
      },
      comments: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            text: 'A은 소심하다.',
          },
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            text: 'B형은 다혈질',
          },
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            text: 'AB형은 싸이코임',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo@gmail.com' },
    update: {},
    create: {
      id: 'user_2XZhhCAYmqcTyFcUbaaAqFL0MIa',
      email: 'inzerokoo@gmail.com',
      mbti: 'ISFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
          {
            pollId: '0249a98f-b570-4e04-b89c-950e13650bc8',
            pollChoiceId: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
          },
          {
            pollId: 'fc0fc980-94c2-481c-930f-06a7c2dee1ba',
            pollChoiceId: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
          },
          {
            pollId: '6fb35c63-1b55-4e53-bf31-98e198d28667',
            pollChoiceId: '4b6b9586-6224-4b4a-9299-459ea28c259a',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+1@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+1@gmail.com',
      mbti: 'ENTP',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
          {
            pollId: '0249a98f-b570-4e04-b89c-950e13650bc8',
            pollChoiceId: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
          },
          {
            pollId: 'fc0fc980-94c2-481c-930f-06a7c2dee1ba',
            pollChoiceId: 'df939951-da0f-4686-a86c-76a185e2da56',
          },
          {
            pollId: '6fb35c63-1b55-4e53-bf31-98e198d28667',
            pollChoiceId: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+2@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+2@gmail.com',
      mbti: 'ISFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
          {
            pollId: '0249a98f-b570-4e04-b89c-950e13650bc8',
            pollChoiceId: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
          },
          {
            pollId: 'fc0fc980-94c2-481c-930f-06a7c2dee1ba',
            pollChoiceId: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
          },
          {
            pollId: '6fb35c63-1b55-4e53-bf31-98e198d28667',
            pollChoiceId: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+3@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+3@gmail.com',
      mbti: 'ENTP',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '36bf06ca-853c-4729-b1bf-a7ee5968059d',
          },
          {
            pollId: '0249a98f-b570-4e04-b89c-950e13650bc8',
            pollChoiceId: '2a3f12be-2a93-42e6-abe2-3f677e544349',
          },
          {
            pollId: 'fc0fc980-94c2-481c-930f-06a7c2dee1ba',
            pollChoiceId: 'df939951-da0f-4686-a86c-76a185e2da56',
          },
          {
            pollId: '6fb35c63-1b55-4e53-bf31-98e198d28667',
            pollChoiceId: '2c882f62-f9d4-491d-b4ca-74ade4a5bc49',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+4@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+4@gmail.com',
      mbti: 'ISFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '36bf06ca-853c-4729-b1bf-a7ee5968059d',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+5@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+5@gmail.com',
      mbti: 'ENFP',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: 'cd90f625-d40b-4964-9fa0-b1857cb8ec4e',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+6@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+6@gmail.com',
      mbti: 'INFP',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: 'bf02d7ef-e916-41ed-a36f-0efc9c8cefd2',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+7@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+7@gmail.com',
      mbti: 'ESFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+7@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+7@gmail.com',
      mbti: 'ESFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+8@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+8@gmail.com',
      mbti: 'ISFP',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: 'cd90f625-d40b-4964-9fa0-b1857cb8ec4e',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+9@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+9@gmail.com',
      mbti: 'INTJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+10@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+10@gmail.com',
      mbti: 'ENTJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: 'cd90f625-d40b-4964-9fa0-b1857cb8ec4e',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+11@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+11@gmail.com',
      mbti: 'INFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '36bf06ca-853c-4729-b1bf-a7ee5968059d',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+12@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+12@gmail.com',
      mbti: 'INFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '36bf06ca-853c-4729-b1bf-a7ee5968059d',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+13@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+13@gmail.com',
      mbti: 'INFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '36bf06ca-853c-4729-b1bf-a7ee5968059d',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+14@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+14@gmail.com',
      mbti: 'ENFJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: '36bf06ca-853c-4729-b1bf-a7ee5968059d',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+15@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+15@gmail.com',
      mbti: 'ENTJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: 'cd90f625-d40b-4964-9fa0-b1857cb8ec4e',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+16@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+16@gmail.com',
      mbti: 'ISTP',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: 'cd90f625-d40b-4964-9fa0-b1857cb8ec4e',
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'inzerokoo+17@gmail.com' },
    update: {},
    create: {
      email: 'inzerokoo+17@gmail.com',
      mbti: 'ESTJ',
      votes: {
        create: [
          {
            pollId: 'c84d8367-460a-4772-b2dd-42170110d774',
            pollChoiceId: 'cd90f625-d40b-4964-9fa0-b1857cb8ec4e',
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
