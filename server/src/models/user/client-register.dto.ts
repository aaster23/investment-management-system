import { IsString, IsNumber } from 'class-validator';

export class ClientRegisterDTO {
    @IsString()
    fullname: string;

    @IsString()
    email: string;

    @IsString()
    amount: string;

    @IsString()
    managerId: string;
}