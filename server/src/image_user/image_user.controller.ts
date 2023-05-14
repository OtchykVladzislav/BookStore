import { Body, Controller, Get, Param, Post, UseGuards, Req, Put} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { CreateImageUserDto } from './dto/create-image-user.dto';
import { ImageUserService } from './image_user.service';

@Controller('image_user')
export class ImageUserController {
    constructor(private imageUserService: ImageUserService) { }

    @UseGuards(JwtAuthGuard)
    @Post('')
    getUser(@Req() req: any, @Body() dto: CreateImageUserDto){
        return this.imageUserService.add(dto, req.user.id)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Param('id') id: number,
        @Body() dto: CreateImageUserDto,
    ) {
        return this.imageUserService.edit(id, dto);
    }
}
