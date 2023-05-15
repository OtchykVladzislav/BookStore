import { Controller, Get, Param, Delete, Put, Req, Body, Post, UseGuards, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get('/')
    getAll(@Query('limit') limit: string, @Query('page') page: string) {
        return this.ordersService.findAll(limit, page);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get('/search')
    filterItems(@Query('query') query: string, @Query('sort') sort: string, @Query('limit') limit: string, @Query('page') page: string) {
        return this.ordersService.filterItems(query, sort, limit, page);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.ordersService.findOne(id);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Req() req: any, @Param('id') id: number) {
        return this.ordersService.remove(id, req.user);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() dto: CreateOrderDto,
    ) {
        return this.ordersService.edit(id, dto, req.user);
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Req() req: any, @Body() dto: CreateOrderDto) {
        return this.ordersService.add(dto, req.user.id);
    }
}
