import prisma from '@repo/database';

export default async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.cloud.deleteMany(),
    prisma.session.deleteMany()
  ]);
};
