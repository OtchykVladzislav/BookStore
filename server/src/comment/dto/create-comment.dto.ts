import { Book } from "books/books.model";

export class CreateCommentDto {
    readonly description: string;
    readonly rating: number;
    readonly book: Book;
}