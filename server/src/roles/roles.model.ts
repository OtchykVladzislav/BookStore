import { Min, Max } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from 'users/users.model';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  name: string;

  @Column()
  description: string;

  @Column({default: 0})
  @Min(0)
  @Max(3)
  weight: number;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
