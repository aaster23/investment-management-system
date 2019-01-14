import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';

export class CompanyDTO {
    @IsString()
    name: string;

    @IsString()
    abbr: string;

    @IsString()
    icon: string;

    @IsString()
    ceo: string;

    @IsString()
    address: string;

    @IsString()
    industryId: string;
}