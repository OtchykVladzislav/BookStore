import { Genre } from "genre/genre.model";
import { CreateImageBookDto } from "image_book/dto/create-image-book.dto";

export class CreateBookDto {
    readonly name: string;
    readonly author: string;
    readonly description: string;
    readonly price: number;
    readonly publish_date: Date;
    readonly genres: Array<Genre>;
    readonly image: CreateImageBookDto;
}