import { FundsService } from './../../core/fund.service';
import { StockDTO } from './../../models/stock.dto';
import { Component, Injectable, OnInit, } from '@angular/core';
import { StocksService } from '../../core/stocks.service';
import { GridOptions, } from 'ag-grid-community';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import { NotificationService } from 'src/app/core/notification.service';
import { ModalDTO } from 'src/app/models/modal.dto';

@Injectable()
@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
    private name: string;

    public gridOptions: GridOptions;
    private columnDefs = [
        { headerName: 'Symbol', field: 'symbol', sortable: true, },
        { headerName: 'Market', field: 'market', sortable: true, },
        { headerName: 'Sell Price ($)', field: 'sellprice', sortable: true, },
        { headerName: 'Buy Price ($)', field: 'buyprice', sortable: true, }
    ];
    private defaultColDef = { width: 280, filter: 'agTextColumnFilter' };
    private rowData = [];
    private rowSelection = 'single';

    constructor(
        private stockService: StocksService,
        public dialog: MatDialog,
        private notification: NotificationService,
        private fundsService: FundsService,
    ) { }
    ngOnInit() {
        this.name = localStorage.getItem('client_name');
        this.gridOptions = <GridOptions>{
            enableRangeSelection: true,
            columnDefs: this.columnDefs,
            onGridReady: () => {
                this.stockService.retrieveCompanyPrices().subscribe((response: []) => {
                    response.forEach((stock: StockDTO) => {
                        const marketData: any = {};
                        marketData.symbol = stock.company.abbr;
                        marketData.market = stock.company.name;
                        marketData.sellprice = +stock.lowprice;
                        marketData.buyprice = +stock.highprice;
                        this.rowData.push(marketData);
                    });
                    if (this.gridOptions.api) {
                        this.gridOptions.api.setRowData(this.rowData);
                    }
                });
                this.gridOptions.rowHeight = 50;
            }
        };
    }
    onRowSelected(event) {
        const instrument = `${event.data.symbol} (${event.data.market})`;
        const dialogRef = this.dialog.open(ModalComponent,
            {
                data: {
                    name: instrument,
                    buyprice: +event.data.buyprice,
                    sellprice: +event.data.sellprice
                }
            });

        dialogRef.afterClosed().subscribe((result: ModalDTO) => {
            if (isNaN(result.total)) {
                return this.notification.openSnackBar('Invalid unit or price', 'OK', 'red');
            }
            this.fundsService.substractFund(result);
        });
    }
}
