import { Request } from 'requests/requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';

@Entity('status_request')
export class Status_Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  status: boolean; 

  @OneToOne(() => Request, request => request.status, { onDelete: "CASCADE" })
  request: Request;
}