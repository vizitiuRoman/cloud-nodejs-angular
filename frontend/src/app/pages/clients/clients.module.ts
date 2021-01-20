import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DocumentsComponent } from '@pages/clients/documents/documents.component';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';

@NgModule({
    declarations: [ClientsComponent, DocumentsComponent],
    imports: [CommonModule, ClientsRoutingModule, FormsModule],
})
export class ClientsModule {}
