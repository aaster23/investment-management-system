export class OpenOrderDTO {
    symbol: string;
    market: string;
    opendate: Date;
    openPrice: number;
    units: number;
    direction: string;
    sellPrice: number;
    buyPrice: number;
    company: {
        abbr,
        name
    };
}
