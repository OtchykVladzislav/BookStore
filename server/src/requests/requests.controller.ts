import { Controller, Param, Get, Delete, Req, Body, Put, Post, UseGuards, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';

@Controller('requests')
export class RequestsController {
    constructor(private requestsService: RequestsService) { }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get('/')
    getAll(@Query('limit') limit: string, @Query('page') page: string) {
        return this.requestsService.findAll(limit, page);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get('/search')
    filterItems(@Query('query') query: string, @Query('sort') sort: string, @Query('limit') limit: string, @Query('page') page: string) {
        return this.requestsService.filterItems(query, sort, limit, page);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.requestsService.findOne(id);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(
        @Param('id') id: number,
        @Req() req: any
    ) {
        return this.requestsService.remove(id, req.user);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() dto: CreateRequestDto,
    ) {
        return this.requestsService.edit(id, dto, req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Req() req: any, @Body() dto: CreateRequestDto) {
        return this.requestsService.add(dto, req.user.id);
    }
}
