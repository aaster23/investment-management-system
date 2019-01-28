import { ModalDTO } from './../models/modal.dto';
import { FundsHttpService } from './funds.http.service';
import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { UsersHttpService } from './user.http.service';
import { UserInfoDTO } from '../models/userInfo.dto';

@Injectable()
export class FundsService {
    public user = new BehaviorSubject<object>({});
    constructor(
        private notificationService: NotificationService,
        private fundsHttpService: FundsHttpService,
        private usersHttpService: UsersHttpService
    ) { }

    substractFund(modal: ModalDTO) {
        const clientCred = {
            email: localStorage.getItem('client_email'),
            amount: modal.total
        };
        this.usersHttpService.retrieveUserData({ email: clientCred.email }).subscribe(
            (response: UserInfoDTO) => {
                if (response.funds.currentamount < clientCred.amount) {
                    return this.notificationService.openSnackBar('Payment failed, not enough money', 'OK', 'red');
                }
                this.fundsHttpService.substractFund(clientCred).subscribe();
                this.notificationService.openSnackBar('Successful payment', 'OK', 'green');
                this.user.next(response);

            }
        );
    }
}
