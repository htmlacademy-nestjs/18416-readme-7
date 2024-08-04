import { PostType, PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '3234545345-7asdfd5-435df-23432423-234234234234234';
const SECOND_POST_UUID = '32423dfsdfs0-adsasd-44435-6546546456-45645645645';

const FIRST_USER_ID = 'sada324234sdffsf23423423';
const SECOND_USER_ID = 'zxc234234sdfsdf2342332';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      name: 'Отличный текст для проверки',
      userId: FIRST_USER_ID,
      postAnons: 'какой-то там анонс публикации',
      postText: 'Какой-то там текст',
      type: PostType.text,
      publicationStatus: 'draft',
      publicationRepostNumber: 1,
      isPublicationReposted: false,
    },
    {
      id: SECOND_POST_UUID,
      quoteText:
        'Цель высшая моя - это чтобы наказание преступлению стало равным',
      quoteAuthor: 'Лис, Антикиллер',
      userId: FIRST_USER_ID,
      type: PostType.quote,
      comments: [
        {
          text: 'Это действительно отличная цитата!',
          userId: FIRST_USER_ID,
        },
        {
          text: 'Надо будет обязательно перечитать.',
          userId: SECOND_USER_ID,
        },
      ],
      tags: ['роман'],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        name: post.name ? post.name : '',
        postAnons: post.postAnons ? post.postAnons : '',
        postText: post.postText ? post.postText : '',
        quoteText: post.quoteText ? post.quoteText : '',
        quoteAuthor: post.quoteAuthor ? post.quoteAuthor : '',
        userId: post.userId,
        type: post.type,
        tags: post.tags,
        publicationStatus: 'draft',
        publicationRepostNumber: 1,
        isPublicationReposted: false,
        comments: post.comments
          ? {
              create: post.comments,
            }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
