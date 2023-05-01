import { Controller, Put, Param, Req, Post, UseGuards } from '@nestjs/common';
import { StatusOrderService } from './status_orders.service';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Roles } from 'roles/roles.decorator';

@Controller('status-orders')
export class StatusOrdersController {
    constructor(private statusOrderService: StatusOrderService) { }


    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
    ) {
        return this.statusOrderService.edit(id);
    }
}
