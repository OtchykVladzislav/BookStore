/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'roles/roles.service';
import { Image_User } from 'image_user/image_user.model';
import { Role } from 'roles/roles.model';

export type user = User

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) { }

  sortArr(str: string, array: User[]): User[]{
    switch(str){
      case 'stringIncrease': return [...array].sort((a,b) => a["username"].localeCompare(b["username"]))
      case 'stringDecrease': return [...array].sort((a,b) => b["username"].localeCompare(a["username"]))
      default : return array
    }
  }

  async createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create({...dto});
    return await this.usersRepository.save(user)
  }

  

  async getAllUsers(limit: string, page: string): Promise<[User[], number]> {
    const skip = (Number(limit) * Number(page)) - Number(limit);
    const [data, count] = await this.usersRepository.findAndCount({
      relations: {
        role: true,
      },
      take: Number(limit),
      skip: skip,
    })
    return [data, count];
  }

  async filterItems(query: string, sort: string,limit: string, page: string): Promise<[User[], number]> {
    const skip = Number(limit) * Number(page)
    const data = await this.usersRepository.find({
      relations: {
        role: true,
      }
    })
    const arr = [...this.sortArr(sort, data).filter(e => e.username.includes(query))]
    if(arr.length >= skip + Number(limit) && page != '1') return [arr.slice(skip, skip + Number(limit)), arr.length];
    if(page == '1') return [arr, arr.length];
    return [arr.slice(skip), arr.length];
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
          orders: true,
          comments: true,
          requests: true
      },
      where: {
        id: id
      }
    })
    return {...user, password: 'hidden'};
  }

  async updatePassword(password : string, id: number){
    await this.usersRepository.update({ id }, { password });
    return true
  }

  async changeImage(id: number, image: Image_User){
    await this.usersRepository.update({id}, {image})
  }

  async addBonus(id: number, bonus: number){
    await this.usersRepository.update({id}, {bonus})
  }

  async delBonus(id: number, bonus: number){
    await this.usersRepository.update({id}, {bonus})
  }

  async updateRole(id: number, role: Role){
    await this.usersRepository.update({ id }, { role });
    return true
  }

}
