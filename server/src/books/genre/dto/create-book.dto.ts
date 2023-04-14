export class CreateBookDto {
    readonly name: string;
    readonly author: string;
    readonly description: string;
    readonly price: number;
    readonly publish_date: Date;
}