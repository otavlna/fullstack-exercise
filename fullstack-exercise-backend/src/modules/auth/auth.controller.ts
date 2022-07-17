import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { LoginResponseDto, ValidateUserDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    description: 'Login endpoint',
    type: ValidateUserDto,
  })
  async login(@Req() req: Request): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}
