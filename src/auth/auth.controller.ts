/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, RefreshTokenBodyDto } from './dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refresh(@Body() body: RefreshTokenBodyDto) {
    return this.authService.refresh(body.refreshToken);
  }
}
