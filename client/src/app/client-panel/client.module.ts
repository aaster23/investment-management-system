import { ClientRoutingModule } from './client.routing.module';
import { StocksComponent } from './stocks/stocks.component';
import { ClientSidebarComponent } from './sidebar/client-sidebar.component';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientPanelComponent } from './client-panel.component';
import { AgGridModule } from 'ag-grid-angular';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ModalComponent } from './stocks/modal/modal.component';
import { ClosePosModalComponent } from './portfolio/close-position-modal/close-pos.modal.component';
import { HistoryComponent } from './history/history.component';
import { GridServiceComponent } from './grid/grid.service.component';

@NgModule({
    imports: [SharedMaterialModule, SharedModule, ClientRoutingModule, AgGridModule.withComponents([])],
    declarations: [
        StocksComponent,
        ClientPanelComponent,
        ClientSidebarComponent,
        PortfolioComponent,
        GridServiceComponent,
        ModalComponent,
        ClosePosModalComponent,
        HistoryComponent
    ],
    entryComponents: [ModalComponent, ClosePosModalComponent],
    providers: [],
    exports: [],
})
export class ClientModule { }
