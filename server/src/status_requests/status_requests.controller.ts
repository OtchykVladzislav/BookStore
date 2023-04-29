import { Controller, Put, Param, Req, Post } from '@nestjs/common';
import { StatusRequestsService } from './status_requests.service';

@Controller('status-requests')
export class StatusRequestsController {
    constructor(private statusRequestService: StatusRequestsService) { }

    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
    ) {
        return this.statusRequestService.edit(id);
    }
    //@UseGuards(RolesGuard)
    //@Roles('user')
    //@UseGuards(JwtAuthGuard)
    @Post('/')
    add() {
        return this.statusRequestService.add();
    }
}
