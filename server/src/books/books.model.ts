/* eslint-disable prettier/prettier */
import { Comment } from 'comment/comment.model';
import { Genre } from 'genre/genre.model';
import { Request } from 'requests/requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[]

  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[]

  @OneToMany(() => Request, (request) => request.book )
  requests: Request[]
}
