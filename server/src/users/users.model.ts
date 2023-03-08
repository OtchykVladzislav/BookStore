/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'roles/roles.model';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({nullable: false})
  username: string;

  @Column({ default: "firstName" })
  firstName: string;

  @Column({ default: "lastName" })
  lastName: string;

  @Column()
  phone: string;

  @Column({default: false})
  phoneConfirmed: boolean;

  @Column()
  email: string;

  @Column({default: false})
  emailConfirmed: boolean;

  @Column({default: false})
  twoFactorEnabled: boolean;

  @Column()
  lockoutEnd: Date;

  @Column({default: true})
  lockoutEnabled: boolean;

  @Column({default: 0})
  accessFailedCount: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
