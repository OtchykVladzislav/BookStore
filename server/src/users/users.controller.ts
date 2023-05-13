/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, UseGuards, Req} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';
import { CreateUserDto } from 'users/dto/create-user.dto';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Post()
    addUser(@Body() dto: CreateUserDto){
        return this.usersService.createUser(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getUser(@Req() req: any, @Param('id') id: number){
        return this.usersService.getUserById(req.user.id)
    }
}
