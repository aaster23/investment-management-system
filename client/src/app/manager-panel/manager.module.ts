import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerPanelComponent } from './manager-panel.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ManagerRoutingModule } from './manager.routing.module';
import { ManagerSidebarComponent } from './sidebar/manager-sidebar.component';

@NgModule({
    imports: [SharedMaterialModule, SharedModule, ManagerRoutingModule],
    declarations: [
        ManagerPanelComponent,
        ClientListComponent,
        ManagerSidebarComponent
    ],
    providers: [],
    exports: [],
})
export class ManagerModule { }
