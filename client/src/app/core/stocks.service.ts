import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AppConfig } from '../config/app.config';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockDTO } from '../models/stock.dto';

@Injectable()
export class StocksService {


    constructor(
        private httpClient: HttpClient,
        private auth: AuthService,
        private appConfig: AppConfig,
        public snackBar: MatSnackBar,
    ) { }

    public retrieveStocksData(): Observable<object> {
        return this.httpClient.get(`${this.appConfig.apiUrl}/companies`);
    }
    public retrieveCompnayPrices(companyId): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/prices`, companyId);
    }
    getStockData() {
        const stocks = [];
        this.retrieveStocksData().subscribe(
            (response: []) => {
                response.forEach((s: StockDTO) => {
                    stocks.push(s.abbr);
                });
            }
        );
        return stocks;
    }
}
