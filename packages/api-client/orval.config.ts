import { defineConfig } from 'orval';

export default defineConfig({
  'cloud-hub-api': {
    input: '../openapi-spec/src/openapi.yaml',
    output: {
      workspace: 'gen',
      target: 'api-client.ts'
    }
  }
});
