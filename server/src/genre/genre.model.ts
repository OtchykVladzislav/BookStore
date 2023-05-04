/* eslint-disable prettier/prettier */
import { Book } from 'books/books.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true,nullable: false})
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  @JoinTable()
  books: Book[]
}
