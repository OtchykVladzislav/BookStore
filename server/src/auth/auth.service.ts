import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { User } from 'users/users.model';
import { RedisClient } from 'redis/redis.client';
import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenDto } from 'users/dto/refresh-token.dto';
import { LoginUserDto } from 'users/dto/login-user.dto';
import { RolesService } from 'roles/roles.service';
import { NewPasswordDto } from 'users/dto/new-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cacheManager: RedisClient,
    private rolesService: RolesService,
  ) {}
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateTokens(user);
  }

  async change_password(passwordDto: NewPasswordDto, id: number) {
    const hashPassword = await bcrypt.hash(passwordDto.password, 5);
    await this.usersService.updatePassword(hashPassword, id);
    return this.deleteRefreshToken(1);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByLogin(userDto.username);
    if (candidate) {
      throw new HttpException(
        'There is already such a user',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const role = await this.rolesService.getRoleByName('user');
    const user = await this.usersService.createUser(
      {
        ...userDto,
        password: hashPassword,
        role
      }
    );
    return this.generateTokens(user);
  }

  async deleteRefreshToken(id: number) {
    const refreshToken = await this.cacheManager.get(id.toString());
    this.cacheManager.del(id.toString());
    this.cacheManager.del(refreshToken.toString());
    return;
  }

  async getRefreshedTokens(refreshTokenDto: RefreshTokenDto) {
    const userId: number | null = await this.cacheManager.get(
      refreshTokenDto.refreshToken,
    );
    if (!userId) {
      throw new HttpException(
        'Refresh token is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.getUserById(userId);
    const tokens = await this.generateTokens(user);
    await this.cacheManager.del(refreshTokenDto.refreshToken);
    return tokens;
  }

  private async generateTokens(user: User) {
    const payload = {
      username: user.username,
      id: user.id,
      roleWeight: user.role.weight,
    };
    const refresh_token = uuidv4();
    await this.cacheManager.set(refresh_token, user.id, {});
    await this.cacheManager.set(user.id.toString(), refresh_token, {});
    return {
      acsess_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.username);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong login or password' });
  }
}
