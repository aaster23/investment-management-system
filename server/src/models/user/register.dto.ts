import { IsString, Matches } from 'class-validator';

export class RegisterDTO {
    @IsString()
    fullname: string;

    @IsString()
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
    password: string;

    @IsString()
    email: string;
}