import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt.interface';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

constructor(private authService: AuthService) { // Inject AuthService here
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'hello', // replace with your secret key
    });
  }


async validate(payload: JwtPayload) {
    const { email, password } = payload;
    //const user = await this.Authservice.validateUser(email, password);
    const user=await this.authService.validateUser(email,password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
