import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-close-pos-modal',
    templateUrl: './close-pos.modal.component.html',
    styleUrls: ['./close-pos.modal.component.css']
})
@Injectable()
export class ClosePosModalComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit(): void {
    }
    getDialogAnswer(answer: boolean) {
        return answer;
    }
}
