import dotenvExtended from 'dotenv-extended';
import dotenvParseVariables from 'dotenv-parse-variables';

const env = dotenvExtended.load({
  path: process.env.ENV_FILE,
  schema: './.env.schema',
  defaults: './.env.defaults',
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true
});

const parsedEnv = dotenvParseVariables(env);

interface Config {
  hostname: string;
  port: number;
  apiBaseUrl: string;

  trustedOrigins: string[];

  betterAuthUrl: string;
  betterAuthSecret: string;

  seaweedFilerUrl: string;

  databaseUrl: string;

  logToConsole: boolean;
  logToFile: boolean;
  logFilePath: string;
}

const config: Config = {
  hostname: parsedEnv.HOSTNAME as string,
  port: parsedEnv.PORT as number,
  apiBaseUrl: parsedEnv.API_BASE_URL as string,

  trustedOrigins: parsedEnv.TRUSTED_ORIGINS as string[],

  betterAuthUrl: parsedEnv.BETTER_AUTH_URL as string,
  betterAuthSecret: parsedEnv.BETTER_AUTH_SECRET as string,

  seaweedFilerUrl: parsedEnv.SEAWEED_FILER_URL as string,

  databaseUrl: parsedEnv.DATABASE_URL as string,

  logToConsole: parsedEnv.LOG_TO_CONSOLE as boolean,
  logToFile: parsedEnv.LOG_TO_FILE as boolean,
  logFilePath: parsedEnv.LOG_FILE_PATH as string
};

export default config;
