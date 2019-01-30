import { ClientRoutingModule } from './client.routing.module';
import { StocksComponent } from './stocks/stocks.component';
import { ClientSidebarComponent } from './sidebar/client-sidebar.component';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientPanelComponent } from './client-panel.component';
import { AgGridModule } from 'ag-grid-angular';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { GridComponent } from './grid/grid.component';
import { ModalComponent } from './stocks/modal/modal.component';
import { ClosePosModalComponent } from './portfolio/close-position-modal/close-pos.modal.component';

@NgModule({
    imports: [SharedMaterialModule, SharedModule, ClientRoutingModule, AgGridModule.withComponents([])],
    declarations: [
        StocksComponent,
        ClientPanelComponent,
        ClientSidebarComponent,
        PortfolioComponent,
        GridComponent,
        ModalComponent,
        ClosePosModalComponent
    ],
    entryComponents: [ModalComponent, ClosePosModalComponent],
    providers: [],
    exports: [],
})
export class ClientModule { }
