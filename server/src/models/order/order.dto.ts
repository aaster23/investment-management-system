import { IsDate, IsNumber, IsString } from 'class-validator';

export class OrderDTO {
    @IsDate()
    openDate: Date;
    @IsDate()
    closeDate: Date;
    @IsNumber()
    buyPrice: number;
    @IsNumber()
    sellPrice: number;
    @IsNumber()
    units: number;
    @IsString()
    companyId: string;
}
