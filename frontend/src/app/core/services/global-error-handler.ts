import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private logger: NGXLogger) {}

    handleError(error: Error | HttpErrorResponse): void {
        if (error instanceof HttpErrorResponse) {
            alert(error.message);
        }
        this.logger.error((error as Error).stack);
    }
}
