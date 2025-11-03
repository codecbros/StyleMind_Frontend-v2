import * as dotenv from 'dotenv';
import { defineConfig } from 'orval';

dotenv.config();

const SWAGGER_URL = process.env.VITE_SWAGGER_API_URL;

if (!SWAGGER_URL) {
  throw new Error('❌ Error: VITE_SWAGGER_API_URL no está definida.');
}

export default defineConfig({
  api: {
    input: {
      target: SWAGGER_URL,
      filters: {
        mode: 'exclude',
        tags: ['app', 'health'],
      },
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      client: 'react-query',
      mock: false,
      prettier: true,
      schemas: 'src/api/generated/schemas',
      override: {
        mutator: {
          path: 'src/config/axios-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
