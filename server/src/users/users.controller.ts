/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { User } from './users.model';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';
import { CreateUserDto } from 'users/dto/create-user.dto';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    //@UseGuards(RolesGuard)
    //@Roles('admin')
    //@UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }

    @Post()
    addUser(@Body() dto: CreateUserDto){
        return this.usersService.createUser(dto)
    }
}
