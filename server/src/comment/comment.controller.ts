import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) { }

    //@UseGuards(RolesGuard)
    //@Roles('admin')
    //@UseGuards(JwtAuthGuard)
    @Get('/book/:id')
    getAll(@Param('id') id: number) {
        return this.commentsService.findAll(id);
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.commentsService.findOne(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.commentsService.remove(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() dto: CreateCommentDto,
    ) {
        return this.commentsService.edit(id, dto);
    }
    //@UseGuards(RolesGuard)
    //@Roles('user')
    //@UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateCommentDto) {
        return this.commentsService.add(dto);
    }
}
