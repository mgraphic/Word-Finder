import 'dotenv/config';

export type ApiConfig = {
    url: string;
    forwardHeaders: boolean;
};

export const environment: {
    port: number;
    accessToken: string | null;
    apis: {
        dictionary: ApiConfig;
        wordFinder: ApiConfig;
    };
} = {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    accessToken: process.env.ACCESS_TOKEN || null,
    apis: {
        dictionary: {
            url:
                process.env.DICTIONARY_API_URL ||
                'https://api.dictionaryapi.dev/api',
            forwardHeaders: false,
        },
        wordFinder: {
            url: process.env.WORD_FINDER_API_URL || 'http://localhost:3001',
            forwardHeaders: true,
        },
    },
};
