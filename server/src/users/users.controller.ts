/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { Controller, Get, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { User } from './users.model';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }
}
