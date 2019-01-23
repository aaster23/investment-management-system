import { StockDTO } from 'src/app/models/stock.dto';
import { Component, Injectable, OnInit, ViewChild, } from '@angular/core';
import { StocksService } from 'src/app/core/stocks.service';
import { AgGridNg2 } from 'ag-grid-angular';

@Injectable()
@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
    private stockdata = [];
    @ViewChild('agGrid') agGrid: AgGridNg2;
    private columnDefs = [
        { headerName: 'Symbol', field: 'symbol', sortable: true, filter: true, checkboxSelection: true },
        { headerName: 'Market', field: 'market', sortable: true, filter: true, checkboxSelection: true },
        { headerName: 'Sell Price', field: 'sellprice', sortable: true, filter: true, checkboxSelection: true },
        { headerName: 'Buy Price', field: 'buyprice', sortable: true, filter: true, checkboxSelection: true }
    ];
    private rowData = [{
        symbol: 'BTC',
        market: 'Bitcoin',
        sellprice: 20,
        buyprice: 22,
    },
    {
        symbol: 'ETH',
        market: 'Ethereum',
        sellprice: 200,
        buyprice: 228,
    }];
    constructor(private stockService: StocksService) {
    }
    ngOnInit() {
        // this.rowData = this.stockService.getStockData();
    }
    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData.map(node => `${node.symbol} ${node.buyprice}`);
        selectedDataStringPresentation.length === 0 ?
            alert('Have to select stock !') :
            alert(`Wanna buy ?: ${selectedDataStringPresentation}`);
    }
}
