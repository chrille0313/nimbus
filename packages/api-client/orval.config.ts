import { defineConfig } from 'orval';

export default defineConfig({
  'cloud-hub-api': {
    input: process.env.OPENAPI_SPECIFICATION_PATH,
    output: {
      baseUrl: process.env.BACKEND_URL,
      workspace: 'gen',
      target: 'api-client.ts',
      headers: true
    }
  }
});
