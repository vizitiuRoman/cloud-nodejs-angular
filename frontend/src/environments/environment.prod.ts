import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: true,
    API_URL: 'http://localhost:8080/api',
    logging: {
        level: NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.ERROR,
        serverLoggingUrl: '',
    },
};
