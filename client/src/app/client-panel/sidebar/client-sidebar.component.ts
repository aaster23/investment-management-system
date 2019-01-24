import { Component, Injectable, OnInit, } from '@angular/core';
import { UserInfoDTO } from '../../models/userInfo.dto';
import { Router } from '@angular/router';
import { UsersHttpService } from 'src/app/core/user.http.service';

@Injectable()
@Component({
    selector: 'app-client-sidebar',
    templateUrl: './client-sidebar.compoennt.html',
    styleUrls: ['./client-sidebar.component.css'],
})
export class ClientSidebarComponent implements OnInit {
    private clientName: string;
    constructor(
        private usersHttpService: UsersHttpService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.usersHttpService.retrieveUserData({ email: localStorage.getItem('client_email') }).subscribe(
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
