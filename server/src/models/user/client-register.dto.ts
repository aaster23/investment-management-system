import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ClientRegisterDTO {
    @IsString()
    fullname: string;

    @IsString()
    email: string;

    @IsString()
    amount: string;

    @IsOptional()
    managerId: string;
}