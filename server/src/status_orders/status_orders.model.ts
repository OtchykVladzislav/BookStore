import { Order } from 'orders/orders.model';
import { Request } from 'requests/requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';

@Entity('status_order')
export class Status_Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  status: boolean; 

  @OneToOne(type => Order, order => order.status, { onDelete: "CASCADE" })
  order: Order;
}