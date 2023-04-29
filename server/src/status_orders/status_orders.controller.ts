import { Controller, Put, Param, Req, Post } from '@nestjs/common';
import { StatusOrderService } from './status_orders.service';

@Controller('status-orders')
export class StatusOrdersController {
    constructor(private statusOrderService: StatusOrderService) { }

    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
    ) {
        return this.statusOrderService.edit(id);
    }
    //@UseGuards(RolesGuard)
    //@Roles('user')
    //@UseGuards(JwtAuthGuard)
    @Post('/')
    add() {
        return this.statusOrderService.add();
    }
}
