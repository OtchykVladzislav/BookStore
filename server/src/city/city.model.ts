import { Min, Max } from 'class-validator';
import { Order } from 'orders/orders.model';
import { Request } from 'requests/requests.model';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from 'users/users.model';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  name: string;

  @Column({nullable: false})
  adress: string;

  @ManyToOne(() => User, (user) => user.cities)
  user: User;

  @OneToMany(() => Request, (request) => request.city)
  requests: Request[]

  @OneToMany(() => Order, (order) => order.city)
  orders: Order[]
}