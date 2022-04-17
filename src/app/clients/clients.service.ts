import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { ClientsEntity } from './clients.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientsRepository: Repository<ClientsEntity>,
  ) {}

  async findAll() {
    return await this.clientsRepository.find({
      select: ['id', 'secret', 'companyId'],
    });
  }

  async findOneOrFail(
    conditions?: FindConditions<ClientsEntity>,
    options?: FindOneOptions<ClientsEntity>,
  ) {
    try {
      return await this.clientsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateClientDto) {
    data.secret = 'test secret';
    const client = this.clientsRepository.create(data);
    return await this.clientsRepository.save(client);
  }

  async update(id: string, data: UpdateClientDto) {
    const client = await this.findOneOrFail({ id });
    this.clientsRepository.merge(client, data);
    return await this.clientsRepository.save(client);
  }

  async destroy(id: string) {
    await this.clientsRepository.findOneOrFail({ id });
    this.clientsRepository.delete({ id });
  }
}
