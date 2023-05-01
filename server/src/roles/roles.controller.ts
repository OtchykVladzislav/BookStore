import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Roles } from 'roles/roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  getAll() {
    return this.rolesService.getAllRoles();
  }
}
