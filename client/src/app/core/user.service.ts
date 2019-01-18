import { UserInfoDTO } from './../models/userInfo.dto';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, } from 'rxjs';

@Injectable()
export class UsersService {

    constructor(
        private httpClient: HttpClient,
        private appConfig: AppConfig
    ) { }

    public retrieveUserData(managerCredentials: any): Observable<HttpEvent<{}>> {
        return this.httpClient.get<{}>(`${this.appConfig.apiUrl}/users/user`, managerCredentials );
    }
}
