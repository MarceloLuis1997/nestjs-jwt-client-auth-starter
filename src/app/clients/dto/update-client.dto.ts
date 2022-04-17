import { IsNotEmpty } from 'class-validator';

export class UpdateClientDto {
  @IsNotEmpty()
  companyId: number;

  @IsNotEmpty()
  description: string;
}
