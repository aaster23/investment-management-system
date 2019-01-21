import { Component, Injectable } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Injectable()
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private auth: AuthService) { }
    private logout() {
        this.auth.logout();
    }
}
