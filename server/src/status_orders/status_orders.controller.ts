import { Controller, Put, Param, Req, Post, UseGuards, Body } from '@nestjs/common';
import { StatusOrderService } from './status_orders.service';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Roles } from 'roles/roles.decorator';

@Controller('status_orders')
export class StatusOrdersController {
    constructor(private statusOrderService: StatusOrderService) { }


    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() obj: any
    ) {
        return this.statusOrderService.edit(id, req.user.id, obj.price);
    }
}
