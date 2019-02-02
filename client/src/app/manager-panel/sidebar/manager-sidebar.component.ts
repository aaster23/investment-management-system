import { Component, Injectable, OnInit, Input, Renderer2, } from '@angular/core';
import { Router } from '@angular/router';
import { StocksService } from '../../core/stocks.service';
import { ManagerGuardService } from '../../route-guard/manager.guard';
import { MatDialog } from '@angular/material';
import { ChartsServiceComponent } from '../charts/charts.service.component';

@Injectable()
@Component({
    selector: 'app-manager-sidebar',
    templateUrl: './manager-sidebar.component.html',
    styleUrls: ['./manager-sidebar.component.css']
})
export class ManagerSidebarComponent implements OnInit {
    private stocksInfo = [];
    private showClients = false;
    @Input() private managerName: string;
    constructor(
        private stocksService: StocksService,
        private router: Router,
        private guard: ManagerGuardService,
        private dialog: MatDialog,

    ) { }

    ngOnInit(): void {
        this.stocksInfo = this.stocksService.getStockData();
    }

    openUpDialog(action) {
        const dialogRef = this.dialog.open(ChartsServiceComponent,
            {
                data: {
                    action
                }
            });
        return dialogRef.afterClosed();
      }
}
