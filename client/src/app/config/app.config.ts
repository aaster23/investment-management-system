import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    public readonly client: string;
    public readonly apiUrl: string;
    public readonly manager: string;
    public readonly closed: string;
    public readonly admin: string;
    public readonly stockDrig: string;
    public readonly portfolioGrid: string;
    public readonly historyGrid: string;

    constructor() {
        this.apiUrl = 'http://localhost:3000';
        this.manager = 'manager';
        this.closed = 'closed';
        this.admin = 'admin';
        this.client = 'client';
        this.portfolioGrid = 'portfolioGrid';
        this.historyGrid = 'historyGrid';
        this.stockDrig = 'stockGrid';
    }
}
