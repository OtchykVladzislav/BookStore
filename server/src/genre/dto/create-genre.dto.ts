import { CreateImageGenreDto } from "image_genre/dto/create-image-genre.dto";

export class CreateGenreDto {
    readonly name: string;
    readonly image: CreateImageGenreDto
}