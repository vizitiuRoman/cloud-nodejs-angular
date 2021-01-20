import { config } from 'dotenv';

config();

export const CONFIG = {
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    DB_PORT: +process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_LOGGING: process.env.DB_LOGGING === 'true',
    PORT: process.env.PORT,
    DEBUG_PORT: process.env.DEBUG_PORT,
    DEBUG_MODE: process.env.DEBUG_MODE,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE && +process.env.MAX_FILE_SIZE,
    MIME_TYPES: process.env.MIME_TYPES.split(','),
    STORAGE_DOCUMENTS: '../documents',
};
