import { FundsService } from './fund.service';
import { ModalDTO } from 'src/app/models/modal.dto';
import { CompanyDTO } from './../models/company.dto';
import { StocksService } from './stocks.service';
import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { CreateOrderDTO } from '../models/order.dto';
import { OrdersHttpService } from './order.http.service';
import { UserInfoDTO } from '../models/userInfo.dto';

@Injectable()
export class OrdersService {
    constructor(
        private notificationService: NotificationService,
        private orderHttpService: OrdersHttpService,
        private stockService: StocksService,
        private fundsService: FundsService,
    ) { }
    saveOrder(result: ModalDTO, companyAbbr) {
        this.stockService.retrieveCompanyInfo({ abbr: companyAbbr }).subscribe((companyInfo: CompanyDTO) => {
            const order: CreateOrderDTO = {
                openDate: result.openDate,
                openPrice: result.price,
                units: result.units,
                clientEmail: localStorage.getItem('client_email'),
                companyId: companyInfo.id,
                direction: result.direction
            };
            this.fundsService.user.subscribe((response: UserInfoDTO) => {
                if (Object.keys(response).length !== 0 && response.funds.currentamount > result.total) {
                    this.orderHttpService.createOrder(order).subscribe();
                    setTimeout(() => {
                        this.notificationService.openSnackBar('Order saved', 'OK', 'green');
                    }, 3500);
                }
            });
        });
    }
}
