/* eslint-disable prettier/prettier */
import { Comment } from 'comment/comment.model';
import { Genre } from 'genre/genre.model';
import { Image_Book } from 'image_book/image_book.model';
import { OrderBook } from 'orders/orderBook.model';
import { Order } from 'orders/orders.model';
import { Request } from 'requests/requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
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

  @ManyToMany(
    () => Order,
    order => order.books,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  )
  orders: Order[];

  @OneToMany(() => OrderBook, order_book => order_book.book)
  public order_book!: OrderBook[];

  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[]

  @OneToMany(() => Request, (request) => request.book )
  requests: Request[]
  
  @OneToOne(() => Image_Book, image => image.book, 
    { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  image: Image_Book
}
