export class StockDTO {
    id: string;
    opendate: string;
    startprice: string;
    endprice: string;
    highprice: string;
    lowprice: string;
    company: {
        id: string,
        name: string,
        abbr: string,
        icon: string,
        ceo: string,
        address: string,
        industry: {
            id: string,
            name: string
        }
    };
}
