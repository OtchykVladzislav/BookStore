/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, UseGuards, Req, Query, Put} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { Role } from 'roles/roles.model';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Query('limit') limit: string, @Query('page') page: string){
        return this.usersService.getAllUsers(limit, page)
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Get('/search')
    filterItems(@Query('query') query: string, @Query('sort') sort: string, @Query('limit') limit: string, @Query('page') page: string) {
        return this.usersService.filterItems(query, sort, limit, page);
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

    @UseGuards(JwtAuthGuard)
    @Post('/del_bonus/:id')
    changeStolen(@Param('id') id: number, @Body() req: any){
        return this.usersService.delBonus(id, req.bonus)
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    changeRole(@Param('id') id: number, @Body() role: Role){
        return this.usersService.updateRole(id, role)
    }
}
