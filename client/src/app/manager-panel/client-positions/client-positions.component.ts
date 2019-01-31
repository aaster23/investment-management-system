import { UserInfoDTO } from './../../models/userInfo.dto';
import { UsersHttpService } from './../../core/user.http.service';
import { Component, Injectable, OnInit, } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { OrdersHttpService } from 'src/app/core/order.http.service';

@Injectable()
@Component({
    selector: 'app-client-positions',
    templateUrl: './client-positions.component.html',
    styleUrls: ['./client-positions.component.css']
})
export class ClientPositionsComponent implements OnInit {
    public gridOptions: GridOptions;
    private defaultColDef = { resizable: true, filter: 'agTextColumnFilter', sortable: true };
    private columnDefs = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Symbol', field: 'symbol' },
        { headerName: 'Direction', field: 'direction' },
        { headerName: 'Units', field: 'units' },
        { headerName: 'Price ($)', field: 'price' },
        { headerName: 'Date', field: 'date' },
    ];
    private rowData = [];

    constructor(
        private usersHttpService: UsersHttpService,
        private ordersHttpService: OrdersHttpService
    ) { }
    ngOnInit() {
        this.gridOptions = <GridOptions>{
            onGridReady: () => {
                const id = { id: localStorage.getItem('manager_id') };
                this.usersHttpService.retrieveClientsData(id).subscribe((clients: []) => {
                    clients.forEach((client: UserInfoDTO) => {

                        this.ordersHttpService.getOpenOrdersByClient({ id: client.id }).subscribe((order: []) => {
                            if (order.length !== 0) {
                                order.forEach((element: any) => {
                                    const clientData: any = {};
                                    clientData.symbol = element.company.abbr;
                                    clientData.direction = element.direction;
                                    clientData.units = element.units;
                                    clientData.price = element.openPrice;
                                    clientData.date = element.opendate;
                                    clientData.name = client.fullname;
                                    this.rowData.push(clientData);
                                    this.gridOptions.api.setRowData(this.rowData);
                                    this.gridOptions.rowHeight = 45;
                                    this.gridOptions.api.sizeColumnsToFit();
                                });
                            }
                        });
                    });
                });
            },
        };
    }
}
