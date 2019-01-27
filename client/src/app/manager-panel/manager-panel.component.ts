import { Component, Injectable, OnInit, } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Injectable()
@Component({
    selector: 'app-manager-panel',
    templateUrl: './manager-panel.component.html',
    styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent implements OnInit {
    private managerName: string;
    constructor(
        private auth: AuthService,
    ) { }

    ngOnInit(): void {
        this.managerName = this.auth.decodeToken().name;
    }
}
