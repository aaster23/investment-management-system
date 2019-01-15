export class AppConfig {
    public readonly apiUrl: string;
    public readonly jwtSecret: string;

    constructor() {
        this.apiUrl = 'http://localhost:3000';
        this.jwtSecret = 'verysecretmaina';
    }
}
