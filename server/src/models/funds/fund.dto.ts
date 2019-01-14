import { IsString, IsNumber } from 'class-validator';

export class FundDTO {

    @IsString()
    client_id: string;

    @IsNumber()
    amount: number;

}
