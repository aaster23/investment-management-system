import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    templateUrl: './404.component.html',
    styleUrls: ['./404.component.css']
})
export class NotFoundComponent implements OnInit {

    constructor(private router: Router) {
    }
    ngOnInit(): void {

        $(document).ready(() => {
            this.showPolygons();
            setInterval(() => {
                this.showPolygons();
            }, 2500);
        });
    }
    login() {
        this.router.navigate(['/login']);
    }

    showPolygons() {
        $('[class="processed"]').removeAttr('class');
        const polyCount = $('polygon').length;
        $('polygon').each(function (ind, el) {
            setTimeout(function () {
                $('polygon:eq(' + ind + ')').attr('class', 'processed');
            }, Math.random() * 2000);
        });
    }
}
