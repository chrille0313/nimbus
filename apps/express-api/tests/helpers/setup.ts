import initialize from './initialize';
import resetDb from './reset-db';
import { afterAll, beforeEach } from 'vitest';
import prisma from '../../src/lib/prisma';

beforeEach(async () => {
  await resetDb();
  await initialize();
});

afterAll(async () => {
  const deleteUserDetails = prisma.user.deleteMany();
  const deleteCloudDetails = prisma.cloud.deleteMany();
  const deleteSessionDetails = prisma.session.deleteMany();
  const deleteAccountDetails = prisma.account.deleteMany();
  const deleteVerificationDetails = prisma.verification.deleteMany();

  await prisma.$transaction([
    deleteUserDetails,
    deleteCloudDetails,
    deleteSessionDetails,
    deleteAccountDetails,
    deleteVerificationDetails
  ]);
  await prisma.$disconnect();
});
