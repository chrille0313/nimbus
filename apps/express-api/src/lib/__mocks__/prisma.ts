import { PrismaClient } from '@repo/database';
import { mockDeep, mockReset } from 'vitest-mock-extended'
import { beforeEach, vi } from 'vitest'

beforeEach(() => {
  mockReset(prisma);
});

const prisma: PrismaClient = mockDeep<PrismaClient>();

export default prisma;

