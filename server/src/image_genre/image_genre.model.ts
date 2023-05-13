import { Genre } from 'genre/genre.model';
import { Order } from 'orders/orders.model';
import { Request } from 'requests/requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';

@Entity('image_genre')
export class Image_Genre {
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

  @OneToOne(() => Genre, genre => genre.image, { onDelete: "CASCADE" })
  genre: Genre;
}