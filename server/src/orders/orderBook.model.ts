/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import { Order } from './orders.model';
import { Book } from 'books/books.model';

@Entity('order_book')
export class OrderBook {
    @PrimaryColumn({ name: 'order_id' })
    public order_id!: number;
  
    @PrimaryColumn({ name: 'book_id' })
    public book_id!: number;

    @Column({default: 1})
    public count!: number;

    @ManyToOne(
        () => Order,
        order => order.order_book
    )
    public order!: Order;
    
    @ManyToOne(
        () => Book,
        book => book.order_book
    )
    public book!: Book;
}
