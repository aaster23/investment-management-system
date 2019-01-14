import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class PriceRequestDTO {

    @IsString()
    id: string;

    @IsDate()
    @IsOptional()
    startdate: Date;

    @IsDate()
    @IsOptional()
    enddate: Date;

    @IsNumber()
    @IsOptional()
    lastN: number;

}