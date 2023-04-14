/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'roles/roles.model';
import { Book } from 'books/books.model';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true,nullable: false})
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: "firstName" })
  firstName: string;

  @Column({ default: "lastName" })
  lastName: string;

  @Column({ default: "+375445798236" })
  phone_number: string;

  @Column({ default: "vlad@mail.ru" })
  email: string;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[]
}
