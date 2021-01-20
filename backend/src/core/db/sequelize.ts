import { Sequelize } from 'sequelize-typescript';

import { DocumentModel } from './models/document.model';
import { ClientModel } from './models/client.model';

import { CONFIG } from '../../shared/utils/config';

// @ts-ignore
export const sequelize = new Sequelize({
    database: CONFIG.DB_NAME,
    username: CONFIG.DB_USER,
    password: CONFIG.DB_PASSWORD,
    host: CONFIG.DB_HOST,
    port: CONFIG.DB_PORT,
    dialect: 'mysql',
    models: [DocumentModel, ClientModel],
    logging: CONFIG.DB_LOGGING,
});
