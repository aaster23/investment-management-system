export class CompanyDTO {
    id: string;
    name: string;
    abbr: string;
    icon: string;
    ceo: string;
    address: string;
    industry: {
        id: string,
        name: string
    };
}
