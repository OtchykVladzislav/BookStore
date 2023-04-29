import { Book } from "books/books.model";
import { Format } from "format/format.model";
import { Type } from "types/types.model";
import { User } from "users/users.model";

export class CreateRequestDto {
    readonly pages: string; 
    readonly count_pages: number; 
    readonly createdAt: Date; 
    readonly user: User;
    readonly format: Format;
    readonly type: Type;
    readonly book: Book
}