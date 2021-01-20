import { ExpressApp } from './express';
import { Logger } from './logging';

export class Application {
    server: Express.Application;
    express: ExpressApp;

    constructor() {
        this.express = new ExpressApp();

        const port = process.env.PORT || '8080';

        this.server = this.express.app.listen(port, () => {
            Logger.info('Server Started!');
            Logger.info(`Http: http://localhost:${port}`);
        });
    }
}
