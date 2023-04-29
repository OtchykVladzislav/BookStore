import { Controller, Get, Param, Delete, Put, Req, Body, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    //@UseGuards(RolesGuard)
    //@Roles('admin')
    //@UseGuards(JwtAuthGuard)
    @Get('/')
    getAll() {
        return this.ordersService.findAll();
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.ordersService.findOne(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.ordersService.remove(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() dto: CreateOrderDto,
    ) {
        return this.ordersService.edit(id, dto);
    }
    //@UseGuards(RolesGuard)
    //@Roles('user')
    //@UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateOrderDto) {
        return this.ordersService.add(dto);
    }
}
