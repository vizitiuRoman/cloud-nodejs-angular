import { Component, OnInit } from '@angular/core';

import { Client, ClientStatus } from '@models/client';
import { ClientService } from '@services/client.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    public clients!: Client[];
    public search!: string;
    public selectedStatus: ClientStatus = ClientStatus.all;

    private ngDestroy$ = new Subject<boolean>();

    constructor(private clientService: ClientService) {}

    ngOnInit(): void {
        this.getClients();
    }

    private getClients(): void {
        this.clientService
            .getClients({
                search: this.search || '',
                status:
                    this.selectedStatus === ClientStatus.all
                        ? undefined
                        : this.selectedStatus,
            })
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((clients) => {
                this.clients = clients;
            });
    }

    public searchClients(): void {
        this.getClients();
    }

    public getClientStatuses(): string[] {
        return Object.keys(ClientStatus);
    }
}
