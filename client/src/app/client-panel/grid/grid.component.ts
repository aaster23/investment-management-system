import { OrdersHttpService } from './../../core/order.http.service';
import { AppConfig } from './../../config/app.config';
import { StockDTO } from './../../models/stock.dto';
import { Component, Injectable, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { StocksService } from '../../core/stocks.service';
import { GridOptions, ColumnApi } from 'ag-grid-community';
import { OpenOrderDTO } from '../../models/open-orders.dto';
import { NotificationService } from 'src/app/core/notification.service';

@Injectable()
@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    public gridOptions: GridOptions;
    private frameworkComponents;
    public columnApi: ColumnApi;
    @Input() private gridType: string;
    @Input() private columnDefs;
    @Output() selectRow = new EventEmitter();
    private defaultColDef = { resizable: true, filter: 'agTextColumnFilter', sortable: true };
    private rowSelection = 'single';
    private rowData = [];

    constructor(
        private stockService: StocksService,
        private appConfig: AppConfig,
        private ordersService: OrdersHttpService,
        private notification: NotificationService
    ) { }
    ngOnInit() {
        if (this.gridType === this.appConfig.stockGrid) {
            this.gridOptions = <GridOptions>{
                columnDefs: this.columnDefs,
                defaultColDef: this.defaultColDef,
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
                            this.gridOptions.api.sizeColumnsToFit();
                        }
                    },
                        (e) => this.notification.openSnackBar('No opened positions for this client', 'OK', 'red'));
                    this.gridOptions.rowHeight = 45;
                }
            };
        } else if (this.gridType === this.appConfig.portfolioGrid) {

            this.gridOptions = <GridOptions>{
                columnDefs: this.columnDefs,
                defaultColDef: this.defaultColDef,
                onGridReady: () => {
                    const clienID = { id: localStorage.getItem('client_id') };
                    this.ordersService.getOpenOrdersByClient(clienID).subscribe((response: []) => {
                        response.forEach((order: OpenOrderDTO) => {
                            const orderData: any = {};
                            orderData.symbol = order.company.abbr;
                            orderData.units = order.units;
                            orderData.direction = order.direction;
                            orderData.price = +order.openPrice;
                            orderData.date = order.opendate;
                            this.rowData.push(orderData);
                        });
                        if (this.gridOptions.api) {
                            this.gridOptions.api.setRowData(this.rowData);
                            this.gridOptions.api.sizeColumnsToFit();
                        }
                    });
                    this.gridOptions.rowHeight = 45;
                }
            };
        }
    }
    onRowSelected(event) {
        this.selectRow.emit(event);
    }
}
