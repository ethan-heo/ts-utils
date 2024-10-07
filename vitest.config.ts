import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['*.test-d.ts'],
    typecheck: {
      include: ['*.test-d.ts'],
    },
  },
});
