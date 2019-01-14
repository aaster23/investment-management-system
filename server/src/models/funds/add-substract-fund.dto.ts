import { IsString, IsNumber } from 'class-validator';

export class AddSubstractFundDTO {

    @IsString()
    id: string;

    @IsNumber()
    amount: number;

}
