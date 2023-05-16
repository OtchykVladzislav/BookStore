import { Book } from "books/books.model";
import { City } from "city/city.model";
import { Format } from "format/format.model";
import { Type } from "types/types.model";

export class CreateRequestDto {
    readonly pages: number; 
    readonly count_copies: number; 
    readonly createdAt: Date;
    readonly format: Format;
    readonly type: Type;
    readonly book: Book;
    readonly city: City;
}