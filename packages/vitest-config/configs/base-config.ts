import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react'

export const baseConfig = defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: [
        [
          'json',
          {
            file: `../coverage.json`
          }
        ]
      ],
      enabled: true
    }
  }
});
