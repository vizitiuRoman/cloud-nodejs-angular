import 'reflect-metadata';

import { config } from 'dotenv';

import { Application } from './config/application';

config();
export default new Application();
