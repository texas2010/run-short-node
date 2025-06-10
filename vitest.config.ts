import { defineConfig } from 'vite';

if (process.env.IS_DOCKER !== 'true') {
  throw new Error('🚫 DO NOT run these tests outside Docker!');
}

export default defineConfig({
  test: {
    exclude: [],
  },
});
