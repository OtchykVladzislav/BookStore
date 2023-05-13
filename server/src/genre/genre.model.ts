/* eslint-disable prettier/prettier */
import { Book } from 'books/books.model';
import { Image_Genre } from 'image_genre/image_genre.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn} from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true,nullable: false})
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  @JoinTable()
  books: Book[]

  @OneToOne(() => Image_Genre, image => image.genre, 
    { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  image: Image_Genre
}
