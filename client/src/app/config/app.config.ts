import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    public readonly client: string;
    public readonly apiUrl: string;
    public readonly manager: string;
    public readonly closed: string;
    public readonly admin: string;

    constructor() {
        this.apiUrl = 'http://localhost:3000';
        this.manager = 'manager';
        this.closed = 'closed';
        this.admin = 'admin';
        this.client = 'client';
    }
}
