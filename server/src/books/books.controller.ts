import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    //@UseGuards(RolesGuard)
    //@Roles('admin')
    //@UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Query('limit') limit: string, @Query('page') page: string) {
        return this.booksService.findAll(limit, page);
    }

    @Get('/search')
    filterItems(@Query('query') query: string, @Query('sort') sort: string, @Query('limit') limit: string, @Query('page') page: string) {
        return this.booksService.filterItems(query, sort, limit, page);
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.booksService.findOne(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.booksService.remove(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() dto: CreateBookDto,
    ) {
        return this.booksService.edit(id, dto);
    }
    //@UseGuards(RolesGuard)
    //@Roles('user')
    //@UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateBookDto) {
        return this.booksService.add(dto);
    }
}
