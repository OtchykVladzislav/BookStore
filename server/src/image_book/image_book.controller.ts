import { Body, Controller, Get, Param, Post, UseGuards, Req, Put} from '@nestjs/common';
import { ImageBookService } from './image_book.service';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { CreateImageBookDto } from './dto/create-image-book.dto';

@Controller('image_book')
export class ImageBookController {
    constructor(private imageBookService: ImageBookService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    getUser(@Req() req: any, @Body() dto: CreateImageBookDto){
        return this.imageBookService.add(dto, req.user.id)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Param('id') id: number,
        @Body() dto: CreateImageBookDto,
    ) {
        return this.imageBookService.edit(id, dto);
    }
}
