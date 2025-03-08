import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: 'vitest.setup.ts',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul',
        reporter: ['html', 'cobertura'],
        thresholds: {
          branches: 90,
          statements: 90,
          functions: 90,
          lines: 90,
        },
        exclude: [
          '**/assets/**',
          '**/e2e/**',
          '**/*.cjs',

          '**/src/App.vue',
          '**/src/main.ts',
          '**/src/router/',
          '**/src/components/ui/**',

          '**/src/utils/locale.ts',

          '**/*.constant.ts',
          '**/*.model.ts',
          '**/*.spec.ts',

          '**/__mock__/**',
          '**/__fixture__/**',
          '**/__temp__/**',
        ],
      }
    }
  })
)
