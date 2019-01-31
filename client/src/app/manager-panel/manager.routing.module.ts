import { ClientPositionsComponent } from './client-positions/client-positions.component';
import { ClientListComponent } from './client-list/client-list.component';
import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagerPanelComponent } from './manager-panel.component';


const routes = [
    {
        path: '', component: ManagerPanelComponent,
        children:
            [
                { path: 'clients', component: ClientListComponent, patMatch: 'full' },
                { path: 'clients/positions', component: ClientPositionsComponent, patMatch: 'full' },
            ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerRoutingModule { }
