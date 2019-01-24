import { Component, Injectable, OnInit, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { StocksService } from '../../core/stocks.service';
import { ManagerGuardService } from '../../route-guard/manager.guard';

@Injectable()
@Component({
    selector: 'app-manager-sidebar',
    templateUrl: './manager-sidebar.component.html',
    styleUrls: ['./manager-sidebar.component.css']
})
export class ManagerSidebarComponent implements OnInit {
    private stocksInfo = [];
    @Input() private managerName: string;
    constructor(
        private stocksService: StocksService,
        private router: Router,
        private guard: ManagerGuardService,
    ) { }

    ngOnInit(): void {

        if (!this.guard.canActivate()) {
            this.router.navigate(['/login']);
        } else {
            this.stocksInfo = this.stocksService.getStockData();
        }
    }
    getClients() {
        this.router.navigate(['manager/clients']);
    }
}
