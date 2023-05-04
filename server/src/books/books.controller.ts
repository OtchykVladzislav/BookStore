import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';


@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get('/without_property')
    getBooks() {
        return this.booksService.bookWithoutProperties();
    }

    @Get()
    getAll(@Query('limit') limit: string, @Query('page') page: string) {
        return this.booksService.findAll(limit, page);
    }

    @Get('/search')
    filterItems(@Query('query') query: string, @Query('sort') sort: string, @Query('limit') limit: string, @Query('page') page: string) {
        return this.booksService.filterItems(query, sort, limit, page);
    }

    @Get('/genre/:id')
    getAllByGenre(@Param('id') id: number, @Query('limit') limit: string, @Query('page') page: string) {
        return this.booksService.findAllBooksByGenre(id, limit, page);
    }

    @Get('/genre/:id/search')
    filterItemsByGenre(@Param('id') id: number, @Query('query') query: string, @Query('sort') sort: string, @Query('limit') limit: string, @Query('page') page: string) {
        return this.booksService.filterAllBooksByGenre(id, query, sort, limit, page);
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.booksService.findOne(id);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.booksService.remove(id);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() dto: CreateBookDto,
    ) {
        return this.booksService.edit(id, dto);
    }
    
    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateBookDto) {
        return this.booksService.add(dto);
    }
}
