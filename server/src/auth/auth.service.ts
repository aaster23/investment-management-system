import { GetUserDTO } from '../models/user/get-user.dto';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload } from './../interfaces/jwt-payload';
import { UsersService } from '../common/core/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  public async signIn(user: UserLoginDTO): Promise<string> {
    const userFound: GetUserDTO = await this.usersService.signIn(user);
    if (userFound) {
      return this.jwtService.sign({ email: userFound.email, role: userFound.role.rolename});
    } else {
      return null;
    }
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    return await this.usersService.validateUser(payload);
  }
}
