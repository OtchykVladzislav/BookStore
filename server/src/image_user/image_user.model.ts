import { Order } from 'orders/orders.model';
import { Request } from 'requests/requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { User } from 'users/users.model';

@Entity('image_user')
export class Image_User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string; 

  @Column({nullable: false})
  type: string; 

  @Column({
    type: 'bytea',
    nullable: false,
  })
  picByte: Buffer;

  @OneToOne(() => User, user => user.image, { onDelete: "CASCADE" })
  user: User;
}