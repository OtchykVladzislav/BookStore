/* eslint-disable prettier/prettier */
import { Book } from 'books/books.model';
import { City } from 'city/city.model';
import { Format } from 'format/format.model';
import { Status_Request } from 'status_requests/status_requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { Type } from 'types/types.model';
import { User } from 'users/users.model';

@Entity('request')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  pages: string; 

  @Column({nullable: false})
  count_pages: number; 

  @Column({nullable: false})
  createdAt: Date; 

  @ManyToOne(() => User, (user) => user.requests)
  user: User

  @ManyToOne(() => Format, (format) => format.requests)
  format: Format

  @ManyToOne(() => Type, (type) => type.requests)
  type: Type

  @ManyToOne(() => Book, (book) => book.requests)
  book: Book

  @ManyToOne(() => City, (city) => city.requests)
  city: City;

  @OneToOne(() => Status_Request)
  @JoinColumn()
  status: Status_Request
}
