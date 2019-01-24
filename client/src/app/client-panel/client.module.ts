import { StocksComponent } from './stocks/stocks.component';
import { ClientSidebarComponent } from './sidebar/client-sidebar.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientPanelComponent } from './client-panel.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    declarations: [
        StocksComponent,
        ClientPanelComponent,
        ClientSidebarComponent,
    ],
    imports: [SharedMaterialModule, SharedModule, AgGridModule.withComponents([])],
    providers: [],
    exports: [],
})
export class ClientModule { }
