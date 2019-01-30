import { AppConfig } from './../../config/app.config';
import { FundsService } from './../../core/fund.service';
import { Component, Injectable, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import { NotificationService } from 'src/app/core/notification.service';
import { ModalDTO } from 'src/app/models/modal.dto';
import { OrdersService } from 'src/app/core/order.service';

@Injectable()
@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
    public stockGrid;
    private columnDefs = [
        { headerName: 'Symbol', field: 'symbol', sortable: true, },
        { headerName: 'Market', field: 'market', sortable: true, },
        { headerName: 'Sell Price ($)', field: 'sellprice', sortable: true, },
        { headerName: 'Buy Price ($)', field: 'buyprice', sortable: true, }
    ];

    constructor(
        public dialog: MatDialog,
        private notification: NotificationService,
        private fundsService: FundsService,
        private orderService: OrdersService,
        private appConfig: AppConfig,
    ) { }
    ngOnInit() {
        this.stockGrid = this.appConfig.stockDrig;
    }
    displayModal(event) {
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
            if (result) {
                if (isNaN(result.total) || +result.units === 0) {
                    return this.notification.openSnackBar('Invalid unit or price', 'OK', 'red');
                }
                this.fundsService.substractFund(result);
                this.orderService.saveOrder(result, event.data.symbol);
            }
        });
    }
}
