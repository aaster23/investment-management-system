import { AppConfig } from './../config/app.config';
import { ManagerGuardService } from './../route-guard/manager.guard';
import { UserInfoDTO } from '../models/userInfo.dto';
import { UsersService } from '../core/user.service';
import { Component, Injectable, OnInit, } from '@angular/core';
import { StocksService } from '../core/stocks.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable()
@Component({
    selector: 'app-manager-panel',
    templateUrl: './manager-panel.component.html',
    styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent implements OnInit {
    // private isDisabled = false;
    // private stocksInfo = [];
    // private managerName: string;
    constructor(
        // private usersService: UsersService,
        // private stocksService: StocksService,
        // private router: Router,
        // private guard: ManagerGuardService,
        // private config: AppConfig,
    ) { }

    ngOnInit(): void {

        // if (!this.guard.canActivate()) {
        //     this.router.navigate([`${this.config.apiUrl}/login`]);
        // } else {
        //     this.usersService.getManagerInfo();
        //     this.usersService.user.subscribe(
        //         (managerData: UserInfoDTO) => {
        //             this.managerName = managerData.fullname;
        //         }
        //     );

        //     this.stocksInfo = this.stocksService.getStockData();
        // }
    }

    // getClients() {
    //     if (this.isDisabled === false) {
    //         return this.isDisabled = true;
    //     } else {
    //         return this.isDisabled = false;
    //     }
    // }
}
