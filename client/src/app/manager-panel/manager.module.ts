import { ClientPositionsComponent } from './client-positions/client-positions.component';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerPanelComponent } from './manager-panel.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ManagerRoutingModule } from './manager.routing.module';
import { ManagerSidebarComponent } from './sidebar/manager-sidebar.component';
import { AgGridModule } from 'ag-grid-angular'; 

@NgModule({
    imports: [SharedMaterialModule, SharedModule, ManagerRoutingModule, AgGridModule.withComponents([])],
    declarations: [
        ManagerPanelComponent,
        ClientListComponent,
        ManagerSidebarComponent,
        ClientPositionsComponent,
    ],
    providers: [],
    exports: [],
})
export class ManagerModule { }
