/* eslint-disable prettier/prettier */
import { Book } from 'books/books.model';
import { City } from 'city/city.model';
import { Format } from 'format/format.model';
import { Status_Request } from 'status_requests/status_requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn} from 'typeorm';
import { Type } from 'types/types.model';
import { User } from 'users/users.model';

@Entity('request')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  pages: string; 

  @Column({nullable: false})
  count_copies: number; 

  @CreateDateColumn()
  createdAt: Date; 

  @ManyToOne(() => User, (user) => user.requests)
  user: User

  @ManyToOne(() => Format, (format) => format.requests, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
  format: Format

  @ManyToOne(() => Type, (type) => type.requests, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
  type: Type

  @ManyToOne(() => Book, (book) => book.requests)
  book: Book

  @ManyToOne(() => City, (city) => city.requests, { onDelete: 'CASCADE' , onUpdate: 'CASCADE'})
  city: City;

  @OneToOne(() => Status_Request, status => status.request, 
    { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  status: Status_Request
}
