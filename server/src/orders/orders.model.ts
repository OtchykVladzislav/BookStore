/* eslint-disable prettier/prettier */
import { Book } from 'books/books.model';
import { Pay_Method } from 'pay_method/pay_method.model';
import { Status_Order } from 'status_orders/status_orders.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable} from 'typeorm';
import { User } from 'users/users.model';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  price: number; 

  @Column({nullable: false})
  date: Date; 

  @ManyToOne(() => User, (user) => user.requests)
  user: User

  @ManyToOne(() => Pay_Method, (pay_method) => pay_method.orders)
  pay_method: Pay_Method

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[]

  @OneToOne(() => Status_Order)
  @JoinColumn()
  status: Status_Order
}
