import { CloseOrderDTO } from './../models/close-order.dto';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { CreateOrderDTO } from '../models/create-order.dto';
import { IdDTO } from '../models/id.dto';

@Injectable()
export class OrdersHttpService {
    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
    ) { }

    public createOrder(orderInfo: CreateOrderDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/order/create`, orderInfo);
    }

    public getOpenOrdersByClient(id: IdDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/order/open`, id);
    }

    public closeOrder(orderBody: CloseOrderDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/order/delete`, orderBody);
    }
    public getAll(): Observable<object> {
        return this.http.get(`${this.appConfig.apiUrl}/order/all`);
    }
}
