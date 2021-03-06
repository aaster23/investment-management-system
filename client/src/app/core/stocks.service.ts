import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { StockDTO } from '../models/stock.dto';
import { IdDTO } from '../models/id.dto';

@Injectable()
export class StocksService {

    private stock = new BehaviorSubject<object>({});
    constructor(
        private httpClient: HttpClient,
        private appConfig: AppConfig,
    ) { }

    // public retrieveStocksData(): Observable<object> {
    //     return this.httpClient.get(`${this.appConfig.apiUrl}/companies`);
    // }
    public retrieveCompanyPrices(): Observable<object> {
        return this.httpClient.get(`${this.appConfig.apiUrl}/prices`);
    }
    public getLastPrices(id: IdDTO): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/prices/last`, id);
    }
    public retrieveCompanyInfo(companyAbbr): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/companies/company`, companyAbbr);
    }
    getStockData(): any[] {
        const stocksData = [];
        let marketData = [];
        this.retrieveCompanyPrices().subscribe((response: []) => {
            response.forEach((stock: StockDTO) => {
                marketData.push(stock.company.abbr, +stock.lowprice, +stock.highprice,
                    stock.company.industry.name, stock.company.name);

                stocksData.push(marketData);
                marketData = [];
            });
        });
        return stocksData;
    }
}
