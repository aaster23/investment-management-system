import { StockDTO } from './../../models/stock.dto';
import { Component, Injectable, OnInit, ViewChild, } from '@angular/core';
import { StocksService } from '../../core/stocks.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions, } from 'ag-grid-community';

@Injectable()
@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
    private name: string;
    @ViewChild('agGrid') agGrid: AgGridNg2;
    public gridOptions: GridOptions;
    private columnDefs = [
        { headerName: 'Symbol', field: 'symbol', sortable: true, filter: true, checkboxSelection: false },
        { headerName: 'Market', field: 'market', sortable: true, filter: true, checkboxSelection: false },
        { headerName: 'Sell Price', field: 'sellprice', sortable: true, filter: true, checkboxSelection: false },
        { headerName: 'Buy Price', field: 'buyprice', sortable: true, filter: true, checkboxSelection: false }
    ];
    private rowData = [];
    private rowSelection = 'single';

    constructor(
        private stockService: StocksService,
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
        console.log(event);
    }
    // For select a stock
    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData.map(node => `${node.symbol} ${node.buyprice}`);
        selectedDataStringPresentation.length === 0 ?
            alert('Have to select stock !') :
            alert(`Wanna buy ?: ${selectedDataStringPresentation}`);
    }
}
