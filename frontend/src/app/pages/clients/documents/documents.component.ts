import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientStatus } from '@models/client';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DocumentService } from '@services/document.service';
import { ClientService } from '@services/client.service';
import { Document } from '@models/document';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
    public documents!: Document[];

    private ngDestroy$ = new Subject<boolean>();
    private clientId!: number;
    private clientStatus!: ClientStatus;

    constructor(
        private documentService: DocumentService,
        private clientService: ClientService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.clientId = params.id;
            this.clientStatus = params.status;
        });
    }

    ngOnInit(): void {
        this.getDocuments();
    }

    private getDocuments(): void {
        this.clientService
            .getClient(this.clientId, this.clientStatus)
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((client) => {
                this.documents = client.documents?.length
                    ? client.documents
                    : [];
            });
    }

    // tslint:disable-next-line:no-any
    public uploadDocuments(target: any): void {
        this.documentService
            .uploadDocuments(
                target.files as FileList,
                this.clientId,
                this.clientStatus
            )
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((documents) => {
                this.documents = [...this.documents, ...documents];
                (document.getElementById(
                    'uploadInput'
                ) as HTMLInputElement).files = null;
            });
    }

    public downloadDocument({ id, name, extension }: Document): void {
        this.documentService
            .downloadDocument(id, this.clientStatus)
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((data) => {
                const downloadURL = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = downloadURL;
                link.download = `${name}.${extension}`;
                link.click();
            });
    }
}
