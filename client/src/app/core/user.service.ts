import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfoDTO } from './../models/userInfo.dto';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { IdDTO } from '../models/id.dto';

@Injectable()
export class UsersService {
    public user = new BehaviorSubject<object>({});
    public clientsData = new BehaviorSubject<object>({});
    constructor(
        private httpClient: HttpClient,
        private auth: AuthService,
        private appConfig: AppConfig,
        public snackBar: MatSnackBar,
    ) { }

    public retrieveUserData(userEmail): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/users/user`, userEmail);
    }

    public retrieveClientsData(id: IdDTO): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/users/clients`, id);
    }

    openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 3500,
        });
    }

    getManagerInfo() {
        const token = this.auth.decodeToken();
        const email = { email: token.email };
        this.retrieveUserData(email).subscribe(
            (managerData: UserInfoDTO) => {
                localStorage.setItem('id', managerData.id);
                this.user.next(managerData);
            }
        );
    }

    getClients() {
        const clientData = [];
        const managerID = { id: localStorage.getItem('id') };
        this.retrieveClientsData(managerID).subscribe(
            (clients: []) => {
                clients.forEach((client: UserInfoDTO) => {
                    const info = [];
                    info.push(client.fullname, client.email, +client.funds.currentamount);
                    clientData.push(info);
                });
            },
            (e) => {
                return this.openSnackBar('No clients to show', 'Ok');
            }
        );
        return clientData;
    }
}
