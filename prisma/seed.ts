import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const zero = await prisma.user.upsert({
    where: { email: 'berksmile@gmail.com' },
    update: {},
    create: {
      id: 'user_2XWzthp7ZkYUJsVJGVfqsDfBrHR',
      email: 'berksmile@gmail.com',
      UserMbti: {
        create: {
          ei: 'I',
          sn: 'N',
          ft: 'T',
          jp: 'P',
        },
      },
      polls: {
        create: [
          {
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
            pollChoiceId: 'bf02d7ef-e916-41ed-a36f-0efc9c8cefd2',
          },
          {
            pollChoiceId: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
          },
          {
            pollChoiceId: '2c882f62-f9d4-491d-b4ca-74ade4a5bc49',
          },
          {
            pollChoiceId: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
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
      UserMbti: {
        create: {
          ei: 'I',
          sn: 'S',
          ft: 'F',
          jp: 'J',
        },
      },
      votes: {
        create: [
          {
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
          {
            pollChoiceId: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
          },
          {
            pollChoiceId: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
          },
          {
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
      UserMbti: {
        create: {
          ei: 'E',
          sn: 'N',
          ft: 'T',
          jp: 'P',
        },
      },
      votes: {
        create: [
          {
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
          {
            pollChoiceId: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
          },
          {
            pollChoiceId: 'df939951-da0f-4686-a86c-76a185e2da56',
          },
          {
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
      UserMbti: {
        create: {
          ei: 'I',
          sn: 'S',
          ft: 'F',
          jp: 'J',
        },
      },
      votes: {
        create: [
          {
            pollChoiceId: '50cd9d61-6d8a-40fa-8d13-e7e118fa37de',
          },
          {
            pollChoiceId: '40ec1f12-6415-49b2-aa58-8ec58944edcc',
          },
          {
            pollChoiceId: 'df939951-da0f-4686-a86c-76a185e2da56',
          },
          {
            pollChoiceId: 'dbb97f12-4b9b-4e2e-8dd3-126b9e1684d2',
          },
        ],
      },
    },
  });
  console.log({ zero });
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
