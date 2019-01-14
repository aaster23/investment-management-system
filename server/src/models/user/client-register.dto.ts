import { IsString, IsNumber } from 'class-validator';

export class ClientRegisterDTO {
    @IsString()
    fullname: string;

    @IsString()
    email: string;

    @IsNumber()
    amount: number;
}