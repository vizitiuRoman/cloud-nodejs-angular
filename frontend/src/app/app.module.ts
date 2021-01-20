import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoggerModule } from 'ngx-logger';

import { GlobalErrorHandler } from '@services/global-error-handler';
import { environment } from '@environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        LoggerModule.forRoot(environment.logging),
    ],
    providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
    bootstrap: [AppComponent],
})
export class AppModule {}
