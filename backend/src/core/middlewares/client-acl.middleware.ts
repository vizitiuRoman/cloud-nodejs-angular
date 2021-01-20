import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';

import { Error } from '../../shared/interfaces/error.interface';
import { ClientStatus } from '../db/models/client.model';

@Service()
@Middleware({ type: 'before' })
export class ClientAclMiddleware implements ExpressMiddlewareInterface {
    use(
        req: Request,
        res: Response,
        next: (err?: Error) => void
    ): void | Response {
        const clientStatus = req.body.status || req.params.status;
        if (clientStatus !== ClientStatus.client) {
            return res.status(StatusCodes.FORBIDDEN).send({
                error: 'You have no permission',
            });
        }
        next();
    }
}
