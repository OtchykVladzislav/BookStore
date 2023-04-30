/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'roles/roles.service';

export type user = User

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService
  ) { }

  async createUser(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const role = await this.rolesService.getRoleByName('user');
    const user = await this.usersRepository.create({
      ...dto,
      password: hashPassword,
      role
    });
    await this.usersRepository.save(user)
    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({
      relations:{
        role: true
      }
    });
    return users;
  }

  async getUserByLogin(username: string) {
    const user = await this.usersRepository.findOne({
      relations: {
        role:true
      },
      where: {
        username
      }
    })
    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      relations: {
        role:true
      },
      where: {
        id: id
      }
    })
    return user;
  }
}
