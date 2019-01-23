import { ClientModule } from './../client-panel/client.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerPanelComponent } from './manager-panel.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ManagerRoutingModule } from './manager.routing.module';
import { ManagerSidebarComponent } from './sidebar/manager-sidebar.component';

@NgModule({
    declarations: [
        ManagerPanelComponent,
        ClientListComponent,
        ManagerSidebarComponent
    ],
    imports: [SharedMaterialModule, SharedModule, CoreModule, ClientModule, ManagerRoutingModule],
    providers: [],
    exports: [],
})
export class ManagerModule { }
