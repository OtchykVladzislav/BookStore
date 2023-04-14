/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'users/users.model';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true,nullable: false})
  name: string;

  @Column({nullable: false})
  author: string;

  @Column({type: 'text'})
  description: string;

  @Column({nullable: false})
  price: number;

  @Column({nullable: false})
  publish_date: Date;

  @ManyToOne(() => User, (user) => user.books)
  user: User
}
