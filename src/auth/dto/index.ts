/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() name: string;
  @IsNotEmpty() password: string;
}

export class LoginUserDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
}

export class CreateTokenDto {
  @IsNotEmpty() email: string;
}

export class RefreshTokenBodyDto {
  @IsNotEmpty() refreshToken: string;
}
