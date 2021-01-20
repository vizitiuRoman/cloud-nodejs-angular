import { NextFunction, Request, Response } from 'express';
import {
    Middleware,
    ExpressErrorMiddlewareInterface,
} from 'routing-controllers';
import { Service } from 'typedi';

import { Error } from '../../shared/interfaces/error.interface';

@Service()
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    public error(
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ): void | Response {
        if (err) {
            if (res.headersSent) {
                return res.end();
            }
            if (err.errors) {
                const error = err.errors.map(({ constraints }) => ({
                    message: Object.keys(constraints).map(
                        (key) => constraints[key]
                    )[0],
                }))[0].message;
                return res
                    .status(err.httpCode)
                    .json({ name: err.name, message: err.message, error });
            }
            delete err.httpCode;
            return res.status(err.httpCode).json(err);
        }
        return next();
    }
}
