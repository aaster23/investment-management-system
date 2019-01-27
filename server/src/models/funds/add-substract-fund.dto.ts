import { IsString, IsNumber } from 'class-validator';

export class AddSubstractFundDTO {

    @IsString()
    email: string;

    @IsNumber()
    amount: number;

}
