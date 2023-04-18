/* eslint-disable prettier/prettier */
import { Book } from 'books/books.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { User } from 'users/users.model';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  description: string;

  @Column({nullable: false})
  rating: number;

  @Column({nullable: false})
  created: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User

  @ManyToOne(() => Book, (book) => book.comments)
  book: Book
}
