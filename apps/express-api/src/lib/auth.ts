import prisma from '@repo/database';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI, username } from 'better-auth/plugins';
import config from '@/config';

export const auth = betterAuth({
  basePath: `${config.apiBaseUrl}/auth`,
  trustedOrigins: config.trustedOrigins,
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
