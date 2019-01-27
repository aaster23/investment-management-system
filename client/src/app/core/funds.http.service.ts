import { AddSubstractDTO } from './../models/add-substract.dto';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { EmailDTO } from '../models/email.dto';

@Injectable()
export class FundsHttpService {
    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
    ) { }

    public substractFund(clientCred: AddSubstractDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/users/funds/substract`, clientCred);
    }

    public addFund(clientCred: AddSubstractDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/users/funds/add`, clientCred);
    }

    public getFund(clientEmail: EmailDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/users/funds`, clientEmail);
    }
}
