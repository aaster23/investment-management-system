import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { UserInfoDTO } from '../models/userInfo.dto';
import { UsersService } from '../core/user.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { IGridData } from '../models/gridData';
import { IdDTO } from '../models/id.dto';

@Injectable()
@Component({
    selector: 'app-manager-panel',
    templateUrl: './manager-panel.component.html',
    styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent implements OnInit {
    isDisabled = false;
    private managerName: string;
    private managerId: string;
    private clientData = []; /* [ [Martin, 500], [Ivan, 50000 ] ]*/
    private clients: [];
    constructor(
        private usersService: UsersService,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.clientData = [];
        const token = this.auth.decodeToken();
        const email = { email: token.email };
        this.usersService.retrieveUserData(email).subscribe(
            (managerData: UserInfoDTO) => {
                this.managerName = managerData.fullname;
            }
        );

    }

    getClients() {
        this.isDisabled = true;
        const managerID = { id: localStorage.getItem('id') };
        this.usersService.getClients(managerID).subscribe(
            (clients: []) => {
                clients.forEach((client: UserInfoDTO) => {
                    const info = [];
                    info.push(client.fullname, +client.funds.currentamount);
                    this.clientData.push(info);
                });
            },
            (e) => {
                return this.usersService.openSnackBar('No clients to show', 'Ok');
            }
        );
    }
}
