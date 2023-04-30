/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'roles/roles.model';
import { Book } from 'books/books.model';
import { Comment } from 'comment/comment.model';
import { Type } from 'types/types.model';
import { Format } from 'format/format.model';
import { Request } from 'requests/requests.model';
import { City } from 'city/city.model';

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

  @Column({default: 0})
  bonus: number;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => Type, (type) => type.user)
  types: Type[]

  @OneToMany(() => Format, (format) => format.user)
  formats: Format[]

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[]

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

  @OneToMany(() => City, (city) => city.user)
  cities: City[]
}
