import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'clients',
        loadChildren: () =>
            import('./pages/clients/clients.module').then(
                (m) => m.ClientsModule
            ),
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'clients',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
