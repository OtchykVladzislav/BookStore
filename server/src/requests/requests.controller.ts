import { Controller, Param, Get, Delete, Req, Body, Put, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('requests')
export class RequestsController {
    constructor(private requestsService: RequestsService) { }

    //@UseGuards(RolesGuard)
    //@Roles('admin')
    //@UseGuards(JwtAuthGuard)
    @Get('/')
    getAll() {
        return this.requestsService.findAll();
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.requestsService.findOne(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.requestsService.remove(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Req() req: any,
        @Param('id') id: number,
        @Body() dto: CreateRequestDto,
    ) {
        return this.requestsService.edit(id, dto);
    }
    //@UseGuards(RolesGuard)
    //@Roles('user')
    //@UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateRequestDto) {
        return this.requestsService.add(dto);
    }
}
