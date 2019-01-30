import { BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

Injectable();
export class GridService implements OnInit {
    public row = new BehaviorSubject<object>({});
    constructor() {
    }
    ngOnInit(): void {
    }
}
