import { NotificationService } from './notification.service';
import { UsersHttpService } from './user.http.service';
import { UserInfoDTO } from '../models/userInfo.dto';
import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';

@Injectable()
export class UsersService {
    public user = new BehaviorSubject<object>({});
    constructor(
        private usersHttpService: UsersHttpService,
        private notificationService: NotificationService,
    ) { }

    setClientCred(email): void {
        this.usersHttpService.retrieveUserData({ email }).subscribe(
            (clientData: UserInfoDTO) => {
                localStorage.setItem('client_name', clientData.fullname);
                localStorage.setItem('client_email', clientData.email);
                localStorage.setItem('client_balance', clientData.funds.currentamount);
            }
        );
    }
    getClients() {
        const clientData = [];
        const managerID = { id: localStorage.getItem('manager_id') };
        this.usersHttpService.retrieveClientsData(managerID).subscribe(
        (clients: []) => {
            clients.forEach((client: UserInfoDTO) => {
                const info = [];
                info.push(client.fullname, client.email, +client.funds.currentamount);
                clientData.push(info);
            });
        },
            (e) => {
                return this.notificationService.openSnackBar('No clients to show', 'Ok', 'red');
            }
        );
        return clientData;
    }
}
