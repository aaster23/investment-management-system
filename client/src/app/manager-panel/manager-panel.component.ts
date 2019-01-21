import { UserInfoDTO } from '../models/userInfo.dto';
import { UsersService } from '../core/user.service';
import { Component, Injectable, OnInit, } from '@angular/core';

@Injectable()
@Component({
    selector: 'app-manager-panel',
    templateUrl: './manager-panel.component.html',
    styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent implements OnInit {
    isDisabled = false;
    private managerName: string;
    constructor(
        private usersService: UsersService,
    ) { }

    ngOnInit(): void {
        this.usersService.getManagerInfo();
        this.usersService.user.subscribe(
            (managerData: UserInfoDTO) => {
                this.managerName = managerData.fullname;
            }
        );

    }
    getClients() {
        this.isDisabled = true;
    }
}
