/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'roles/roles.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: "firstName" })
  firstName: string;

  @Column({ default: "lastName" })
  lastName: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
