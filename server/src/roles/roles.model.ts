import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'users/users.model';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;
/*
  @Column()
  description: string;
*/
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
