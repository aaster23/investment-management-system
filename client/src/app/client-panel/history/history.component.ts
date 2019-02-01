import { OrdersHttpService } from './../../core/order.http.service';
import { AppConfig } from 'src/app/config/app.config';
import { Component, Injectable, OnInit, } from '@angular/core';
import { GridOptions, } from 'ag-grid-community';

@Injectable()
@Component({
    selector: 'app-portfolio',
    templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
    private portfolioGrid: string;
    public gridOptions: GridOptions;
    private columnDefs = [
        { headerName: 'Symbol', field: 'symbol' },
        { headerName: 'Units', field: 'units' },
        { headerName: 'Direction', field: 'direction' },
        { headerName: 'Price ($)', field: 'openPrice' },
        { headerName: 'Close Price ($)', field: 'closePrice' },
        { headerName: 'Result ($)', field: 'result' },
        { headerName: 'Open date', field: 'openDate' },
        { headerName: 'Close date', field: 'closeDate' },
    ];

    constructor(
        private orderHttpService: OrdersHttpService,
        private appConfig: AppConfig,
    ) { }
    ngOnInit() {
        this.portfolioGrid = this.appConfig.historyGrid;
    }
}

