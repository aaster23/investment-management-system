// import { ClientRoutingModule } from './client.routing.module';
import { ClientSidebarComponent } from './sidebar/client-sidebar.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientPanelComponent } from './client-panel.component';

@NgModule({
    declarations: [
        ClientPanelComponent,
        ClientSidebarComponent
    ],
    imports: [SharedMaterialModule, SharedModule, CoreModule, ],
    providers: [],
    exports: [],
})
export class ClientModule { }
