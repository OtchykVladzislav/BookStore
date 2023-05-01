import { Controller, Get, Param, Delete, Put, Req, Body, Post, UseGuards } from '@nestjs/common';
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
    getAll() {
        return this.ordersService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.ordersService.findOne(id);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.ordersService.remove(id);
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
        return this.ordersService.edit(id, dto);
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateOrderDto) {
        return this.ordersService.add(dto);
    }
}
