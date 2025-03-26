import { uiConfig } from '@repo/vitest-config/ui';
import { defineProject, mergeConfig } from 'vitest/config';

export default mergeConfig(
  uiConfig,
  defineProject({
    test: {
      include: ['**/*test.e2e.ts'],
      setupFiles: ['tests/helpers/setup.ts'],
      poolOptions: {
        threads: {
          singleThread: true
        }
      }
    }
  })
);
