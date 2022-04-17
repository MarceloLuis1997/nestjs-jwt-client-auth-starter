import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'clients' })
export class ClientsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  secret: string;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
