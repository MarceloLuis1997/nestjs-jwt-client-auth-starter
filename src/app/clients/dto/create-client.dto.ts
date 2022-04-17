import { IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  secret: string;

  @IsNotEmpty()
  companyId: number;

  @IsNotEmpty()
  description: string;
}
