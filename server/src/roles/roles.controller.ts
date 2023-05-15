import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get('/search')
  filterItems(@Query('query') query: string) {
      return this.rolesService.filterByName(query);
  }

  @Get()
  getAll() {
    return this.rolesService.getAllRoles();
  }
}
