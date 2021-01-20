import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandler } from '@services/global-error-handler';

describe('GlobalErrorHandlerService', () => {
    let service: GlobalErrorHandler;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GlobalErrorHandler);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
