import { Book } from "books/books.model";
import { City } from "city/city.model";
import { Pay_Method } from "pay_method/pay_method.model";

export class CreateOrderDto {
    readonly price: number;
    readonly pay_method: Pay_Method; 
    readonly date: Date;
    readonly books: Array<Book>;
    readonly city: City;
}