import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

@Entity('status_request')
export class Status_Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  status: boolean; 
}