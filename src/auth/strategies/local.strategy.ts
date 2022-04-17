import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'clientId',
      passwordField: 'clientSecret',
    });
  }

  async validate(clientId: string, clientSecret: string) {
    const client = await this.authService.validateClient(
      clientId,
      clientSecret,
    );

    if (!client) {
      throw new UnauthorizedException('Invalid client id/secret.');
    }

    return client;
  }
}
