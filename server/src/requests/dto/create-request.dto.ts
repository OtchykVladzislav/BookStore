import { Book } from "books/books.model";
import { Format } from "format/format.model";
import { Type } from "types/types.model";
import { User } from "users/users.model";

export class CreateRequestDto {
    readonly name: string;
    readonly pages: string; 
    readonly count_pages: string; 
    readonly createdAt: Date; 
    readonly user: User;
    readonly format: Format;
    readonly type: Type;
    readonly book: Book
}