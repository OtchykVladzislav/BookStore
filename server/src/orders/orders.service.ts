import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { StatusOrderService } from 'status_orders/status_orders.service';
import { User } from 'users/users.model';
import { OrderBook } from './orderBook.model';
import { Book } from 'books/books.model';
import { City } from 'city/city.model';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderBook)
        private orderBookRepository: Repository<OrderBook>,
        private statusOrderService: StatusOrderService
    ) {}

    sortArr(str: string, array: Order[]): Order[]{
      switch(str){
        case 'numberIncrease': return [...array].sort((a,b) => a["price"] - b["price"])
        case 'numberDecrease': return [...array].sort((a,b) => b["price"] - a["price"])
        default : return array
      }
    }

    async findAll(limit: string, page: string): Promise<[Order[], number]> {
      const skip = (Number(limit) * Number(page)) - Number(limit);
      const [data, count] = await this.orderRepository.findAndCount({
        relations: {
          books: true,
          user: true,
          status: true,
          city: true
        },
        take: Number(limit),
        skip: skip,
      })
      return [data, count];
    }

    async filterItems(query: string, sort: string,limit: string, page: string): Promise<[Order[], number]> {
      const skip = Number(limit) * Number(page);
      const data = await this.orderRepository.find({
        relations: {
          books: true,
          user: true,
          status: true,
          city: true
        }
      })
      const arr = [...this.sortArr(sort, data).filter(e => `${e.number_order}`.includes(query))]
      if(arr.length - 1 >= skip + Number(limit)){
        return [arr.slice(skip, skip + Number(limit)), arr.length != 0 ? arr.length  : 1 ];
      }
      return [arr.slice(skip), arr.length != 0 ? arr.length  : 1 ];
    }

    async findByUser(id: number): Promise<Order[]> {
      const data = await this.orderRepository.find({
          where: {
            user: { id }
          },
          relations: {
            books: true,
            user: true,
            status: true,
            city: true
          }
      })
      return data;
  }

    async findOne(id: number): Promise<Order> {
      const order_book = await this.orderBookRepository.find({where: {order_id: id}})
      const data = await this.orderRepository.findOne({
        where: {
          id
        },
        relations: {
            books: true,
            user: true,
            status: true,
            city: true
        }
      });
      return {...data, order_book};
  }

    async add(dto: CreateOrderDto, id: number): Promise<boolean> {
      const status = await this.statusOrderService.add();
      const getAll = await this.orderRepository.find();
      const data = this.orderRepository.create({...dto});
      data.number_order = (getAll.length == 0 ? 0 : getAll[getAll.length-1].id) + 10
      data.user = {id: id} as User
      data.status = status
      data.books = [...dto.books.map(e => {return {id: e.id} as Book})]
      const obj = await this.orderRepository.save(data);
      await this.orderBookRepository.save([...dto.books.map(e => {return {order_id: obj.id, book_id: e.id, count: e.count, orderId: obj.id, bookId: e.id}})])
      return true;
    }

    async edit(id: number, dto: CreateOrderDto, user: any): Promise<boolean> {
      const data = await this.orderRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
        },
      });
      if (user.id !== data.user.id && user.roleWeight != 3) {
        throw new UnauthorizedException({ message: 'user has no rights' });
      }
      await this.orderRepository.update({ id }, { ...dto });
      return true;
    }

    async remove(id: number, user: any): Promise<boolean> {
      const data = await this.orderRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
        },
      });
      await this.statusOrderService.delete(data.status.id)
      if (user.id !== data.user.id && user.roleWeight != 3) {
        throw new UnauthorizedException({ message: 'user has no rights' });
      }
      await this.orderRepository.remove(data);
      return true;
    }
}
