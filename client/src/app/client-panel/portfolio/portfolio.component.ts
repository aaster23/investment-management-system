import { CloseOrderDTO } from './../../models/close-order.dto';
import { AppConfig } from 'src/app/config/app.config';
import { Component, Injectable, OnInit, } from '@angular/core';
import { GridOptions, } from 'ag-grid-community';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/core/notification.service';
import { OrdersService } from 'src/app/core/order.service';
import { ClosePosModalComponent } from './close-position-modal/close-pos.modal.component';

@Injectable()
@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
    private frameworkComponents;
    private portfolioGrid: string;
    public gridOptions: GridOptions;
    private columnDefs = [
        { headerName: 'Symbol', field: 'symbol', sortable: true, },
        { headerName: 'Direction', field: 'direction', sortable: true, },
        { headerName: 'Units', field: 'units', sortable: true, },
        { headerName: 'Price ($)', field: 'price', sortable: true, },
        { headerName: 'Date', field: 'date', sortable: true, },
    ];

    constructor(
        public dialog: MatDialog,
        private notification: NotificationService,
        private orderService: OrdersService,
        private appConfig: AppConfig,
    ) { }
    ngOnInit() {
        this.portfolioGrid = this.appConfig.portfolioGrid;
    }

    closePosition(event) {
        const instrument = `${event.data.symbol}`;
        const dialogRef = this.dialog.open(ClosePosModalComponent,
            {
                data: {
                    name: instrument,
                }
            });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                const orderBody: CloseOrderDTO = {
                    direction: event.data.direction,
                    price: event.data.price,
                    units: event.data.units,
                    companyId: '',
                    closePrice: '',
                };
                this.orderService.closeOrder(orderBody, event.data.symbol);
            }
        });
    }
}

