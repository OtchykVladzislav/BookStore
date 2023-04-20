/* eslint-disable prettier/prettier */
import { Request } from 'requests/requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { User } from 'users/users.model';

@Entity('formats')
export class Format {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true,nullable: false})
  name: string;

  @ManyToOne(() => User, (user) => user.formats)
  user: User

  @OneToMany(() => Request, (request) => request.format )
  requests: Request[]
}
