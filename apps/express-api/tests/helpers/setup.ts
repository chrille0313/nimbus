import initialize from './initialize';
import resetDb from './reset-db';
import { afterAll, beforeEach, beforeAll } from 'vitest';
import prisma from '../../src/lib/prisma';
import { createServer } from '../../src/utils/server';
import config from '../../src/config';
import OpenAPISpecification from '@repo/openapi-spec';
import * as api from '../../src/controllers';

beforeEach(async () => {
  await resetDb();
  await initialize();
});

afterAll(async () => {
  // const deleteUserDetails = prisma.user.deleteMany();
  // const deleteCloudDetails = prisma.cloud.deleteMany();
  // const deleteSessionDetails = prisma.session.deleteMany();
  // const deleteAccountDetails = prisma.account.deleteMany();
  // const deleteVerificationDetails = prisma.verification.deleteMany();

  await prisma.$transaction([
    deleteUserDetails,
    deleteCloudDetails,
    deleteSessionDetails,
    deleteAccountDetails,
    deleteVerificationDetails
  ]);
  await prisma.$disconnect();
});
