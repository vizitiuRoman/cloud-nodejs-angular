import { Response } from 'express';
import {
    Controller,
    Get,
    Param,
    QueryParams,
    Res,
    UseBefore,
} from 'routing-controllers';
import { Service } from 'typedi';
import { StatusCodes } from 'http-status-codes';
import { SearchClientParams } from '../db/models/client.model';
import { ClientAclMiddleware } from '../middlewares/client-acl.middleware';

import { ClientService } from '../services/client.service';

@Service()
@Controller('/api/clients')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Get('')
    async getClients(
        @QueryParams() params: SearchClientParams,
        @Res() res: Response
    ): Promise<Response> {
        try {
            const clients = await this.clientService.findClientsBySearchClause(
                params
            );
            return res.status(StatusCodes.OK).send(clients);
        } catch (e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                error: e.message,
            });
        }
    }

    @Get('/:id/:status')
    @UseBefore(ClientAclMiddleware)
    async getClient(
        @Param('id') id: number,
        @Res() res: Response
    ): Promise<Response> {
        try {
            const client = await this.clientService.findClientByID(id);
            if (!client) {
                return res.status(StatusCodes.NOT_FOUND).send({
                    error: `Not found client by id ${id}`,
                });
            }
            return res.status(StatusCodes.OK).send(client);
        } catch (e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                error: e.message,
            });
        }
    }
}
