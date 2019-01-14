import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';
import { Role } from 'src/data/entities/role.entity';

export class GetUserDTO {

  email: string;

  password: string;

  role: Role;
}
