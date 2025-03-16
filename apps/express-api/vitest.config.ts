import { uiConfig } from '@repo/vitest-config/ui';
import { defineProject, mergeConfig } from 'vitest/config';

export default mergeConfig(
  uiConfig,
  defineProject({
    test: {
      setupFiles: ['tests/helpers/setup.ts'],
      poolOptions: {
        threads: {
          singleThread: true
        }
      }
    }
  })
);
