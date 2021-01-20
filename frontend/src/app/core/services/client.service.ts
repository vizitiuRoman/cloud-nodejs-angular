import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Client, ClientStatus, SearchClientParams } from '@models/client';
import { environment } from '@environments/environment';
import { API } from '@utils/constants';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    constructor(private httpClient: HttpClient) {}

    public getClients(searchParams?: SearchClientParams): Observable<Client[]> {
        return this.httpClient.get<Client[]>(
            `${environment.API_URL}/${API.GET_CLIENTS}`,
            {
                params: searchParams as {},
            }
        );
    }

    public getClient(id: number, status: ClientStatus): Observable<Client> {
        return this.httpClient.get<Client>(
            `${environment.API_URL}/${API.GET_CLIENTS}/${id}/${status}`
        );
    }
}
