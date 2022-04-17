import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsEntity } from 'src/app/clients/clients.entity';
import { ClientsService } from 'src/app/clients/clients.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientsService,
    private readonly jwtService: JwtService,
  ) {}

  async login(client: ClientsEntity) {
    const payload = {
      sub: client.id,
      companyId: client.companyId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateClient(id: string, secret: string) {
    let client: ClientsEntity;

    try {
      client = await this.clientService.findOneOrFail({ id });
    } catch (error) {
      return null;
    }

    if (client.secret !== secret) {
      return null;
    }

    return client;
  }
}
