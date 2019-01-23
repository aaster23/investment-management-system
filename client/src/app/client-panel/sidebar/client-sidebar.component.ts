import { Component, Injectable, OnInit, } from '@angular/core';
import { UsersService } from '../../core/user.service';
import { UserInfoDTO } from '../../models/userInfo.dto';
import { Router } from '@angular/router';

@Injectable()
@Component({
    selector: 'app-client-sidebar',
    templateUrl: './client-sidebar.compoennt.html',
    styleUrls: ['./client-sidebar.component.css'],
})
export class ClientSidebarComponent implements OnInit {
    private clientName: string;
    constructor(
        private usersService: UsersService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.usersService.retrieveUserData({ email: localStorage.getItem('client_email') }).subscribe(
            (client: UserInfoDTO) => {
                this.clientName = client.fullname;
            }
        );
    }
    private showGrid() {
        this.router.navigate(['/manager/client/stocks']);
    }
    private clear() {
        localStorage.removeItem('client_email');
    }
}
