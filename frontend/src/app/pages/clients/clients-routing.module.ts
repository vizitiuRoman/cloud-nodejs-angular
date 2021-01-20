import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from '@pages/clients/documents/documents.component';

import { ClientsComponent } from './clients.component';

const routes: Routes = [
    { path: '', component: ClientsComponent },
    { path: 'documents/:id/:status', component: DocumentsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientsRoutingModule {}
