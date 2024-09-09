import 'dotenv/config';

export const environment: {
    port: number;
    accessToken: string | null;
} = {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    accessToken: process.env.ACCESS_TOKEN ?? null,
};
