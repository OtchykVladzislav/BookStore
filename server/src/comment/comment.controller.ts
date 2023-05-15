import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Roles } from 'roles/roles.decorator';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) { }
    @Get('/book/:id')
    getAll(@Param('id') id: number) {
        return this.commentsService.findAll(id);
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.commentsService.findOne(id);
    }
    
    @UseGuards(RolesGuard)
    @Roles(2, 3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(
        @Param('id') id: number,
        @Req() req: any
    ) {
        return this.commentsService.remove(id, req.user.id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() dto: CreateCommentDto,
    ) {
        return this.commentsService.edit(id, dto, req.user.id);
    }
    
    
    
    @UseGuards(JwtAuthGuard)
    @Post()
    add(
        @Body() dto: CreateCommentDto,
        @Req() req: any
    ) {
        return this.commentsService.add(dto, req.user.id);
    }
}
