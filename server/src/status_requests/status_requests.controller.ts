import { Controller, Put, Param, Req, Post, UseGuards } from '@nestjs/common';
import { StatusRequestsService } from './status_requests.service';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Roles } from 'roles/roles.decorator';

@Controller('status-requests')
export class StatusRequestsController {
    constructor(private statusRequestService: StatusRequestsService) { }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
    ) {
        return this.statusRequestService.edit(id);
    }
}
