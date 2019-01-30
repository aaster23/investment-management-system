import { Component, OnInit, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable()
@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    private selectedMenu: string;

    constructor(
        public snackBar: MatSnackBar,
    ) { }
    ngOnInit(): void {
    }

    private selectMenu(menu: string) {
        this.selectedMenu = menu;
    }
}
