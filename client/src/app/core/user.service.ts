import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from './notification.service';
import { UsersHttpService } from './user.http.service';
import { AuthService } from './auth.service';
import { UserInfoDTO } from '../models/userInfo.dto';
import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { PayloadDTO } from '../models/payload.dto';

@Injectable()
export class UsersService {
    public user = new BehaviorSubject<object>({});
    constructor(
        private auth: AuthService,
        private usersHttpService: UsersHttpService,
        private notificationService: NotificationService,
        private jwtHelperService: JwtHelperService,
    ) { }

    setClientName(email): void {
        this.usersHttpService.retrieveUserData({ email }).subscribe(
            (clientData: UserInfoDTO) => {
                localStorage.setItem('client_name', clientData.fullname);
            }
        );
    }

    // getManagerInfo() {
    //     const token = this.auth.decodeToken();
    //     const email = { email: token.email };
    //     this.usersHttpService.retrieveManagerData(email).subscribe(
    //         (managerData: UserInfoDTO) => {
    //             localStorage.setItem('manager_id', managerData.id);
    //             this.user.next(managerData);
    //         }
    //     );
    // }

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
                return this.notificationService.openSnackBar('No clients to show', 'Ok');
            }
        );
        return clientData;
    }

    getDecodedToken() {
        const token = localStorage.getItem('access_token');
        const decodedToken: PayloadDTO = this.jwtHelperService.decodeToken(token);
        return decodedToken;
    }
}
