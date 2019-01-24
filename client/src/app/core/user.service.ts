import { NotificationService } from './notification.service';
import { UsersHttpService } from './user.http.service';
import { AuthService } from './auth.service';
import { UserInfoDTO } from '../models/userInfo.dto';
import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';

@Injectable()
export class UsersService {
    public user = new BehaviorSubject<object>({});
    public clientData = new BehaviorSubject<object>({});
    constructor(
        private auth: AuthService,
        private usersHttpService: UsersHttpService,
        private notificationService: NotificationService,
    ) { }

    setClientEmail(email) {
        this.usersHttpService.retrieveUserData({ email }).subscribe(
            (clientData: UserInfoDTO) => {
                localStorage.setItem('client_email', clientData.email);
                this.clientData.next(clientData);
            }
        );
    }

    getManagerInfo() {
        const token = this.auth.decodeToken();
        const email = { email: token.email };
        this.usersHttpService.retrieveManagerData(email).subscribe(
            (managerData: UserInfoDTO) => {
                localStorage.setItem('id', managerData.id);
                this.user.next(managerData);
            }
        );
    }

    getClients() {
        const clientData = [];
        const managerID = { id: localStorage.getItem('id') };
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
