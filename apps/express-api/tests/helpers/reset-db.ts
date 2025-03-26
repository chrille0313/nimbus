import prisma from '../../src/lib/prisma';

export default async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.cloud.deleteMany(),
    prisma.session.deleteMany()
  ]);
};
