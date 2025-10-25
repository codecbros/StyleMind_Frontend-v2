import { defineConfig } from 'orval'

export default defineConfig({
    api: {
        input: {
            target: 'https://stylemind-backend.onrender.com/api-docs',
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