import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
@Injectable()
export class ModalComponent implements OnInit {
    private buyPrice: number;
    private sellPrice: number;
    private price: number;
    private units: number;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit(): void {
        this.buyPrice = +this.data.buyprice;
        this.sellPrice = +this.data.sellprice;
    }
    getDialogInfo() {
        const total = (this.units * this.price).toFixed(2);
        const direction = this.price > this.sellPrice ? 'Sell' : 'Buy';
        return {
            price: this.price,
            units: this.units,
            total,
            direction,
            openDate: new Date(),
        };
    }
}
