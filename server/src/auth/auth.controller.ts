import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'users/dto/login-user.dto';
import { RefreshTokenDto } from 'users/dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }


  @Post('/refresh-token')
  getRefreshedTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.getRefreshedTokens(refreshTokenDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logout(@Req() req: any) {
    const id = req.user.id;
    return this.authService.deleteRefreshToken(id);
  }
}
