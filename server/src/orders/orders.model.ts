/* eslint-disable prettier/prettier */
import { Book } from 'books/books.model';
import { City } from 'city/city.model';
import { Status_Order } from 'status_orders/status_orders.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, OneToMany} from 'typeorm';
import { User } from 'users/users.model';
import { OrderBook } from './orderBook.model';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  number_order: number;

  @Column({nullable: false})
  price: number; 

  @CreateDateColumn()
  date: Date; 

  @Column({default: false})
  is_card: boolean; 

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @ManyToMany(() => Book, book => book.orders)
  @JoinTable({
    name: 'order_book',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
  })
  books: Book[]

  @OneToMany(() => OrderBook, order_book => order_book.order)
  order_book: OrderBook[];

  @ManyToOne(() => City, (city) => city.orders)
  city: City;

  @OneToOne(() => Status_Order, status => status.order, 
    { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  status: Status_Order
}
