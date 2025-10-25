import { defineConfig } from 'orval'
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    api: {
        input: {
            target: process.env.VITE_SWAGGER_API_URL as string,
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