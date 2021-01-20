import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { ClientController } from '../core/controllers/client.controller';
import { DocumentController } from '../core/controllers/document.controller';
import {
    ClientModel,
    ClientStatus,
    Client,
} from '../core/db/models/client.model';

import { sequelize } from '../core/db/sequelize';

import { ErrorHandlerMiddleware } from '../core/middlewares/error-handler.middleware';
import { ClientService } from '../core/services/client.service';
import { DocumentService } from '../core/services/document.service';

import { setupLogging } from './logging';

export class ExpressApp {
    constructor(public readonly app: express.Express = express()) {
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        setupLogging(this.app);

        this.setupExpressServer();
    }

    private setupExpressServer(): void {
        useExpressServer(this.app, {
            defaultErrorHandler: false,
            middlewares: [ErrorHandlerMiddleware],
            controllers: [DocumentController, ClientController],
        });
        Container.import([DocumentService, ClientService]);
        useContainer(Container);
        sequelize.sync().then(() => {
            const clients: Client[] = [
                {
                    id: 1,
                    BirthDate: '2000.01.01',
                    email: 'johny@gmail.com',
                    firstName: 'Johny',
                    ipAddress: '100.222.444.333',
                    lastName: 'Cutz',
                    registrationDate: '2020.11.01',
                    status: ClientStatus.client,
                },
                {
                    id: 2,
                    BirthDate: '2000.01.01',
                    email: 'roma@gmail.com',
                    firstName: 'Roma',
                    ipAddress: '100.222.444.333',
                    lastName: 'Vizitiu',
                    registrationDate: '2020.11.01',
                    status: ClientStatus.client,
                },
                {
                    id: 3,
                    BirthDate: '2000.01.01',
                    email: 'andy@gmail.com',
                    firstName: 'Andy',
                    ipAddress: '100.222.444.333',
                    lastName: 'Holod',
                    registrationDate: '2020.11.01',
                    status: ClientStatus.lead,
                },
                {
                    id: 4,
                    BirthDate: '2000.01.01',
                    email: 'demo@gmail.com',
                    firstName: 'Demo Client',
                    ipAddress: '100.222.444.333',
                    lastName: 'Demo',
                    registrationDate: '2020.11.01',
                    status: ClientStatus.demo,
                },
            ];
            return ClientModel.bulkCreate(clients, {
                updateOnDuplicate: ['id'],
            });
        });
    }
}
