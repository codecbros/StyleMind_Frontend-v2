import { defineConfig } from 'orval'
import * as dotenv from 'dotenv';

dotenv.config();


const SWAGGER_URL = process.env.VITE_SWAGGER_API_URL;

if (!SWAGGER_URL) {
    throw new Error('❌ Error: VITE_SWAGGER_API_URL no está definida.');
}

export default defineConfig({
    api: {
        input: {
            target: SWAGGER_URL,
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
                    path: 'src/api/axios-instance.ts',
                    name: 'customInstance',
                },
            },
        },
    },
});