import { IsDate, IsNumber, IsString } from 'class-validator';

export class OrderDTO {
    @IsDate()
    openDate: Date;
    @IsDate()
    openPrice: number;
    @IsNumber()
    units: number;
    @IsString()
    companyId: string;
    @IsString()
    clientEmail: string;
    direction: string;
}
