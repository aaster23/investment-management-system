import { ClientRoutingModule } from './client.routing.module';
import { StocksComponent } from './stocks/stocks.component';
import { ClientSidebarComponent } from './sidebar/client-sidebar.component';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientPanelComponent } from './client-panel.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    imports: [SharedMaterialModule, SharedModule, ClientRoutingModule, AgGridModule.withComponents([])],
    declarations: [
        StocksComponent,
        ClientPanelComponent,
        ClientSidebarComponent,
    ],
    providers: [],
    exports: [],
})
export class ClientModule { }
