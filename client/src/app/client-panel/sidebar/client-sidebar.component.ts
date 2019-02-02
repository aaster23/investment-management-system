import { UserInfoDTO } from './../../models/userInfo.dto';
import { Component, Injectable, OnInit, Input, Renderer2, OnChanges, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersHttpService } from 'src/app/core/user.http.service';
import { OrdersService } from 'src/app/core/order.service';
import { OrdersHttpService } from 'src/app/core/order.http.service';

@Injectable()
@Component({
    selector: 'app-client-sidebar',
    templateUrl: './client-sidebar.compoennt.html',
    styleUrls: ['./client-sidebar.component.css'],
})
export class ClientSidebarComponent implements OnInit {
    @Input() private clientName: string;
    @Input() private balance: string;

    constructor(
        private usersHttpService: UsersHttpService,
        private router: Router,
        private ordersService: OrdersHttpService,
        private route: ActivatedRoute,
        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        this.clientName = localStorage.getItem('client_name');
        this.updateBalance();
        const header = document.getElementById('sidebarBtns');
        const btns = header.getElementsByClassName('btn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                const current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace(' active', '');
                this.className += ' active';
            });
        }
    }

    public updateBalance() {

        const email = { email: localStorage.getItem('client_email') };

        this.usersHttpService.retrieveUserData(email).subscribe(
            (response: UserInfoDTO) => {
                this.balance = response.funds.currentamount;
                document.getElementsByClassName('text-white')[1].textContent = `Balance: ${this.balance}.00 $`;
            }
        );


    }
    private showGrid() {
        this.router.navigate(['/client/stocks']);
    }
    private clear() {
        localStorage.removeItem('client_name');
        localStorage.removeItem('client_email');
        localStorage.removeItem('client_id');
    }
}
