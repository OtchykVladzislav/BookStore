import { Controller, Param, Get, Delete, Req, Body, Put, Post, UseGuards } from '@nestjs/common';
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
    getAll() {
        return this.requestsService.findAll();
    }


    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.requestsService.findOne(id);
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.requestsService.remove(id);
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
        return this.requestsService.edit(id, dto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateRequestDto) {
        return this.requestsService.add(dto);
    }
}
