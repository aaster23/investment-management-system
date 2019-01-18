import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfoDTO } from './../models/userInfo.dto';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, } from 'rxjs';
import { PayloadDTO } from '../models/payload.dto';

@Injectable()
export class UsersService {
    constructor(
        private httpClient: HttpClient,
        private appConfig: AppConfig,
    ) { }

    public retrieveUserData(userEmail): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/users/user`, userEmail);
    }
}
