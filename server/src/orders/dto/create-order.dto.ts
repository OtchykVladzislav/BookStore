import { Book } from "books/books.model";
import { City } from "city/city.model";

export class CreateOrderDto {
    readonly price: number;
    readonly books: Array<{id: number, count: number}>;
    readonly city: City;
    readonly is_card: boolean;
}