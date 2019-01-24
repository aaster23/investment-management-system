import { Component, Injectable, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/user.service';
import { StocksService } from '../../core/stocks.service';
import { ManagerGuardService } from '../../route-guard/manager.guard';
import { AppConfig } from '../../config/app.config';
import { UserInfoDTO } from '../../models/userInfo.dto';

@Injectable()
@Component({
    selector: 'app-manager-sidebar',
    templateUrl: './manager-sidebar.component.html',
    styleUrls: ['./manager-sidebar.component.css']
})
export class ManagerSidebarComponent implements OnInit {
    private stocksInfo = [];
    private managerName: string;
    constructor(
        private usersService: UsersService,
        private stocksService: StocksService,
        private router: Router,
        private guard: ManagerGuardService,
        private config: AppConfig,
    ) { }

    ngOnInit(): void {

        if (!this.guard.canActivate()) {
            this.router.navigate([`${this.config.apiUrl}/login`]);
        } else {
            this.usersService.getManagerInfo();
            this.usersService.user.subscribe(
                (managerData: UserInfoDTO) => {
                    this.managerName = managerData.fullname;
                }
            );

            this.stocksInfo = this.stocksService.getStockData();
        }
    }
    getClients() {
        this.router.navigate(['manager/clients']);
    }
}
