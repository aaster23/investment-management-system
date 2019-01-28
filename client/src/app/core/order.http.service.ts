import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { CreateOrderDTO } from '../models/order.dto';

@Injectable()
export class OrdersHttpService {
    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
    ) { }

    public createOrder(orderInfo: CreateOrderDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/order/create`, orderInfo);
    }
}
