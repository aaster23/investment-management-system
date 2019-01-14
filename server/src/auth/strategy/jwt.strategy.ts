import { GetUserDTO } from '../../models/user/get-user.dto';
import { JwtPayload } from './../../interfaces/jwt-payload';
import { ConfigService } from './../../config/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<GetUserDTO> {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new Error('Not authorized');
    }
    return user;
  }
}
