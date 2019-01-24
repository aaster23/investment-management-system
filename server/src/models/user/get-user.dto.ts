import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';
import { Role } from '../../data/entities/role.entity';

export class GetUserDTO {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  role: Role;
  fullname: string;
}
