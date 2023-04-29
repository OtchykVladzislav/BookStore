import { CreateRoleDto } from './dto/create-role.dto';
import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.create(dto);
    await this.rolesRepository.save(role);
    return role;
  }

  async getAllRoles() {
    const roles = await this.rolesRepository.find();
    return roles;
  }

  async getRoleByName(name: string) {
    const roles = await this.rolesRepository.findOne({
      where: {
        name,
      },
    });
    return roles;
  }
}
