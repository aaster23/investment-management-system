import { UsersService } from '../core/user.service';
import { Component, Injectable, OnInit, Output, } from '@angular/core';
import { NotificationService } from '../core/notification.service';

@Injectable()
@Component({
    selector: 'app-client-panel',
    templateUrl: './client-panel.component.html',
    styleUrls: ['./client-panel.component.css']
})
export class ClientPanelComponent implements OnInit {
    private clientName: string;
    constructor(
        private notificationService: NotificationService,
    ) { }
    ngOnInit(): void {
        this.clientName = localStorage.getItem('client_names');
    }
}
