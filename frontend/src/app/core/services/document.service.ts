import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientStatus } from '@models/client';

import { Observable } from 'rxjs';

import { API } from '@utils/constants';
import { environment } from '@environments/environment';
import { Document } from '@models/document';

@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    constructor(private httpClient: HttpClient) {}

    public downloadDocument(
        id: number,
        status: ClientStatus
    ): Observable<Blob> {
        return this.httpClient.get(
            `${environment.API_URL}/${API.DOWNLOAD_DOCUMENT}/${id}/${status}`,
            {
                responseType: 'blob',
            }
        );
    }

    public uploadDocuments(
        files: FileList,
        clientId: number,
        status: ClientStatus
    ): Observable<Document[]> {
        const formData = new FormData();
        Array.from({ length: files.length }).forEach((_, i: number) => {
            formData.append('files', files[i]);
        });
        return this.httpClient.post<Document[]>(
            `${environment.API_URL}/${API.UPLOAD_DOCUMENTS}/${clientId}/${status}`,
            formData
        );
    }
}
