import { defineConfig } from 'orval';

export default defineConfig({
  'cloud-hub-api': {
    input: '../openapi-spec/src/openapi.yaml',
    output: {
      baseUrl: 'http://localhost:9000/api/v1/',
      workspace: 'gen',
      target: 'api-client.ts',
      headers: true
    }
  }
});
