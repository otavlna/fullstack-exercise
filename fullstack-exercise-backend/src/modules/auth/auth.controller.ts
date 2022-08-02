import { Controller, Req, Post, UseGuards, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { ValidateUserDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    description: 'Login endpoint',
    type: ValidateUserDto,
  })
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const loginResponse = await this.authService.login(req.user);
    res.cookie('access-token', loginResponse.access_token, {
      httpOnly: true,
    });
    res.cookie('logged-in', true);
  }

  @Post('auth/logout')
  @ApiBody({
    description: 'Logout endpoint',
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token', { httpOnly: true });
    res.clearCookie('logged-in');
  }
}
