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
        { headerName: 'Symbol', field: 'symbol', width: 150 },
        { headerName: 'Units', field: 'units', width: 100 },
        { headerName: 'Direction', field: 'direction', width: 90 },
        { headerName: 'Price ($)', field: 'openPrice', width: 100 },
        { headerName: 'Close Price ($)', field: 'closePrice', width: 100 },
        {
            headerName: 'Result ($)', field: 'result', width: 100,
            valueParser: this.numberParser,
            cellClassRules: {
                'rag-green': 'x > 0',
                'rag-blue': 'x === 0',
                'rag-red': 'x < 0'
            }
        },
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
    numberParser(params) {
        const newValue = params.newValue;
        let valueAsNumber = 0;
        if (newValue === null || newValue === undefined || newValue === '') {
            valueAsNumber = null;
        } else {
            valueAsNumber = parseFloat(params.newValue);
        }
        return valueAsNumber;
    }
}

