import { Express } from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

export const Logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});

const level = process.env.DEBUG_MODE || 'info';

export function setupLogging(app: Express): void {
    setupExpress(app);
}

function setupExpress(app: Express): void {
    if (level === 'debug') {
        app.use(
            expressWinston.errorLogger({
                transports: [new winston.transports.Console({})],
            })
        );
    }

    if (level === 'info') {
        app.use(
            expressWinston.logger({
                transports: [new winston.transports.Console({})],
            })
        );
    }
}
