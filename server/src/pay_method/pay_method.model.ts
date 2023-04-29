import { Order } from 'orders/orders.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity('pay_method')
export class Pay_Method {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  name: string; 

  @OneToMany(() => Order, (order) => order.pay_method)
  orders: Order[]
}