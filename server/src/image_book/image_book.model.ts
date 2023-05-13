import { Book } from 'books/books.model';
import { Order } from 'orders/orders.model';
import { Request } from 'requests/requests.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';

@Entity('image_book')
export class Image_Book {
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

  @OneToOne(() => Book, book => book.image, { onDelete: "CASCADE" })
  book: Book;
}