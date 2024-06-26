declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            NODE_ENV: 'development' | 'production';
            API: string;
        }
    }
}