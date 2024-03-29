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

    @UseGuards(RolesGuard)
    @Roles(2, 3)
    @UseGuards(JwtAuthGuard)
    @Get('/stolen/:id')
    changeStolen(@Param('id') id: number){
        return this.booksService.stolenFalse(id)
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

    @UseGuards(JwtAuthGuard)
    @Post('/array')
    filterByArr(@Body() array: any) {
        return this.booksService.filterByIDArray(array);
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
        return this.booksService.edit(id, dto, req.user.id);
    }
    
    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Req() req: any, @Body() dto: CreateBookDto) {
        return this.booksService.add(dto, req.user.id);
    }
}
