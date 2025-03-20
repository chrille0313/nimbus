import prisma from '@repo/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI, username } from 'better-auth/plugins';

export const auth = betterAuth({
  basePath: '/api/v1/auth',
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  account: {
    accountLinking: {
      enabled: true
    }
  },
  emailAndPassword: {
    enabled: true
  },
  plugins: [username(), openAPI()]
});

export type SessionContext = typeof auth.$Infer.Session;
