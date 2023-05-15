/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import { Order } from './orders.model';
import { Book } from 'books/books.model';

@Entity('order_book')
export class OrderBook {
    @PrimaryColumn({ name: 'order_id' })
    order_id: number;
  
    @PrimaryColumn({ name: 'book_id' })
    book_id: number;

    @Column({default: 1})
    count: number;

    @ManyToOne(
        () => Order,
        order => order.order_book
    )
    order: Order;
    
    @ManyToOne(
        () => Book,
        book => book.order_book
    )
    book: Book;
}
